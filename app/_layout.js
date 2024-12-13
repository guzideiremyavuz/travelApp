import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Tabs } from "expo-router";

export default function Layout() {
  const router = useRouter();

  useEffect(() => {
    // İlk açılışta index.js'e yönlendir
    router.replace("/");
  }, [router]);

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Header'ı gizlemek için
      }}
    />
  );
}
