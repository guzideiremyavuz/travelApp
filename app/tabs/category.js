import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useFavorites } from "../../context/FavoriteContext";
import { useUser } from "../../context/UserContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Category = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const { user } = useUser();
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/listing/${item.id}`)}
      className="mb-6"
    >
      <View className="relative mx-4 bg-white rounded-2xl shadow-lg">
        <TouchableOpacity
          onPress={async () => {
            if (!user) {
              router.push("/profile/auth");
              return;
            }

            const alreadyFav = favorites.some((fav) => fav.id === item.id);
            toggleFavorite(item);

            try {
              if (!alreadyFav) {
                await fetch("https://67f6443142d6c71cca613e64.mockapi.io/favorites", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    userId: user.id,
                    placeId: item.id,
                    placeName: item.name || item.title,
                    country: item.country,
                    image: item.image,
                  }),
                });
              } else {
                const res = await fetch("https://67f6443142d6c71cca613e64.mockapi.io/favorites");
                const favData = await res.json();

                const found = favData.find(
                  (f) => f.userId === user.id && f.placeId === item.id
                );

                if (found?.id) {
                  await fetch(
                    `https://67f6443142d6c71cca613e64.mockapi.io/favorites/${found.id}`,
                    { method: "DELETE" }
                  );
                }
              }
            } catch (err) {
              console.error("Favori işlem hatası:", err);
            }
          }}
          className="absolute top-2 right-2 z-10 bg-white/70 p-2 rounded-full"
        >
          <Ionicons
            name={
              favorites.some((fav) => fav.id === item.id) ? "heart" : "heart-outline"
            }
            size={26}
            color={favorites.some((fav) => fav.id === item.id) ? "red" : "gray"}
          />
        </TouchableOpacity>

        <Image
          source={{ uri: item.image }}
          className="w-full h-52 rounded-t-2xl"
        />

        <View className="p-4">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-black font-semibold text-base" numberOfLines={1}>
              {item.name || item.title}
            </Text>
            <Text className="text-orange-500 font-bold">${item.price}</Text>
          </View>
          <Text className="text-gray-500 text-sm">{item.country}</Text>
          {item.distance && (
            <Text className="text-orange-400 text-sm mt-1">
              {item.distance}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#f9f9f9] pt-6">
      <Text className="text-2xl font-bold px-4 mb-4">Your Favorites</Text>

      {favorites.length === 0 ? (
        <Text className="px-4 text-gray-400">No favorites yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id?.toString()}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      )}
    </View>
  );
};

export default Category;
