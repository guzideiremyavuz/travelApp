import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const setUser = async (newUser) => {
    setUserState(newUser);
    if (newUser) {
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
    } else {
      await AsyncStorage.removeItem("user");
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUserState(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Kullanıcı verisi alınamadı:", err);
      } finally {
        setIsUserLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isUserLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
