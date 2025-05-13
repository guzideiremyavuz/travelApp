import { Stack } from "expo-router";
import { FavoriteProvider } from "../context/FavoriteContext";
import { UserProvider } from "../context/UserContext"; // ekledik

export default function Layout() {
  return (
    <UserProvider>
      <FavoriteProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </FavoriteProvider>
    </UserProvider>
  );
}

