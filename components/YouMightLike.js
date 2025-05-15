import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoriteContext";
import { useUser } from "../context/UserContext";

const YouMightLike = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { favorites, toggleFavorite } = useFavorites();
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://67f6443142d6c71cca613e64.mockapi.io/places"
        );
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#ff7f36" className="mt-10" />;
  }

  return (
    <View className="px-4">
      <Text className="text-lg font-semibold mb-2">You might like</Text>

      {data.map((item) => {
        const isFavorite =
          Array.isArray(favorites) &&
          favorites.some((fav) => fav.placeId.toString() === item.id.toString());

        return (
          <TouchableOpacity
            key={item.id?.toString()}
            onPress={() => router.push(`/listing/${item.id}`)}
            className="flex-row items-center mb-4"
          >
            <Image
              source={{ uri: item.image }}
              className="w-20 h-20 rounded-lg mr-4"
            />
            <View className="flex-1">
              <Text className="text-base font-semibold">{item.title}</Text>
              <Text className="text-gray-500">{item.country}</Text>
              <Text className="text-xs text-orange-500">{item.distance}</Text>
            </View>
            <View className="items-end">
              <Text className="text-orange-500 font-bold mb-1">
                ${item.price}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (!user?.id) {
                    router.push("/profile/auth");
                    return;
                  }
                  toggleFavorite(item);
                }}
                className="bg-white/80 p-1 rounded-full"
              >
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={22}
                  color={isFavorite ? "red" : "gray"}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default YouMightLike;
