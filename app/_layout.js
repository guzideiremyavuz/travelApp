import { Stack, Slot } from "expo-router";
import { FavoriteProvider } from "../context/FavoriteContext";
import { UserProvider } from "../context/UserContext";

export default function Layout() {
  return (
    <UserProvider>
      <FavoriteProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Slot />
        </Stack>
      </FavoriteProvider>
    </UserProvider>
  );
}
