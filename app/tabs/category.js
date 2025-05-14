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

  const renderItem = ({ item }) => {
    const place = item?.place;

    if (!place || !place.id) return null;

    const isFavorite =
      Array.isArray(favorites) &&
      favorites.some((fav) => fav.placeId.toString() === place.id.toString());

    return (
      <TouchableOpacity
        onPress={() => router.push(`/listing/${place.id}`)}
        className="mb-6"
      >
        <View className="relative mx-4 bg-white rounded-2xl shadow-lg">
          <TouchableOpacity
            onPress={() => {
              if (!user?.id) {
                router.push("/profile/auth");
                return;
              }

              if (!place?.id) {
                console.warn("Favoriye eklenmeye çalışılan place eksik:", place);
                return;
              }

              toggleFavorite(place);
            }}
            className="absolute top-2 right-2 z-10 bg-white/70 p-2 rounded-full"
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={26}
              color={isFavorite ? "red" : "gray"}
            />
          </TouchableOpacity>

          <Image
            source={{ uri: place.image || "" }}
            className="w-full h-52 rounded-t-2xl"
          />

          <View className="p-4">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-black font-semibold text-base" numberOfLines={1}>
                {place.name || place.title || "Unnamed"}
              </Text>
              <Text className="text-orange-500 font-bold">
                ${place.price || "0"}
              </Text>
            </View>
            <Text className="text-gray-500 text-sm">{place.country || "Unknown"}</Text>
            {place.distance && (
              <Text className="text-orange-400 text-sm mt-1">
                {place.distance}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-[#f9f9f9] pt-6">
      <Text className="text-2xl font-bold px-4 mb-4">Your Favorites</Text>

      {!Array.isArray(favorites) || favorites.length === 0 ? (
        <Text className="px-4 text-gray-400">No favorites yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id?.toString() || item?.placeId?.toString()}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      )}
    </View>
  );
};

export default Category;
