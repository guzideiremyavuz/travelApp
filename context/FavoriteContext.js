import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useUser();

  const BASE_URL = "https://67f6443142d6c71cca613e64.mockapi.io/favorites";

  // Kullanıcı değiştiğinde favorileri yükle
  useEffect(() => {
    const loadFavorites = async () => {
      if (!user?.id) {
        setFavorites([]);
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}?userId=${Number(user.id)}`);
        const data = await res.json();
        setFavorites(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Favori yükleme hatası:", err);
        setFavorites([]);
      }
    };

    loadFavorites();
  }, [user]);

const toggleFavorite = async (place) => {
  if (!user?.id || !place?.id) return;

  const placeId = place.id.toString();
  const userId = user.id.toString();

  const existing = favorites.find(
    (fav) =>
      fav.placeId?.toString() === placeId &&
      fav.userId?.toString() === userId
  );

  try {
    if (existing) {
      await fetch(`${BASE_URL}/${existing.id}`, { method: "DELETE" });
      setFavorites((prev) =>
        prev.filter((fav) => fav.id !== existing.id)
      );
    } else {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          placeId,
          placeName: place.name || place.title,
          country: place.country || "",
          image: place.image || "",
          price: place.price || "",
          place,
        }),
      });

      const newFav = await res.json();
      setFavorites((prev) => [...prev, newFav]);
    }
  } catch (err) {
    console.error("Favori toggle hatası:", err);
  }
};


  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
