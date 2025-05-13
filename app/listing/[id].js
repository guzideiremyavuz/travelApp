import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useFavorites } from "../../context/FavoriteContext";
import { Ionicons } from "@expo/vector-icons";

const ListingDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [personCount, setPersonCount] = useState(1);
  const { favorites, toggleFavorite } = useFavorites();

  const endpoints = [
    "https://67f6443142d6c71cca613e64.mockapi.io/recomendedPlaces",
    "https://67f6443142d6c71cca613e64.mockapi.io/places",
    "https://67f6443142d6c71cca613e64.mockapi.io/searchPlaces",
    "https://67f6443142d6c71cca613e64.mockapi.io/searchPlaces1",
    "https://67f6443142d6c71cca613e64.mockapi.io/searchPlaces2",
    "https://67f6443142d6c71cca613e64.mockapi.io/searchPlaces3",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await Promise.all(
          endpoints.map((url) => fetch(url).then((res) => res.json()))
        );
        const merged = allData.flat();
        const found = merged.find((item) => item.id === id);
        setData(found);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const increasePerson = () => setPersonCount((prev) => prev + 1);
  const decreasePerson = () =>
    setPersonCount((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-400">Loading...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-red-500">Place not found.</Text>
      </View>
    );
  }

  const totalPrice = (parseFloat(data.price) * personCount).toFixed(2);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-12 left-4 z-10 bg-white p-2 rounded-full shadow"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleFavorite(data)}
          className="absolute top-12 right-4 z-10 bg-white/70 p-2 rounded-full"
        >
          <Ionicons
            name={
              favorites.some((fav) => fav.id === data.id)
                ? "heart"
                : "heart-outline"
            }
            size={28}
            color={favorites.some((fav) => fav.id === data.id) ? "red" : "gray"}
          />
        </TouchableOpacity>

        <Image
          source={{ uri: data.image }}
          className="w-full h-64"
          resizeMode="cover"
        />

        <View className="p-5 pb-28">
          <Text className="text-2xl font-bold mb-1">
            {data.name || data.title}
          </Text>
          <Text className="text-gray-600 mb-1">{data.country}</Text>
          {data.distance && (
            <Text className="text-orange-400 mb-2">{data.distance}</Text>
          )}
          <Text className="text-orange-500 font-bold text-lg mb-4">
            ${data.price} per person
          </Text>

          {data.tripPlan && (
            <>
              <Text className="text-lg font-semibold mb-1">Trip Plan</Text>
              <Text className="text-gray-700 mb-4">{data.tripPlan}</Text>
            </>
          )}

          {data.description && (
            <>
              <Text className="text-lg font-semibold mb-1">Description</Text>
              <Text className="text-gray-600">{data.description}</Text>
            </>
          )}
        </View>
      </ScrollView>

      {/* Order Section */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-gray-500">Select Persons:</Text>
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity
              onPress={decreasePerson}
              className="bg-gray-200 px-3 py-1 rounded-full"
            >
              <Text className="text-xl mx-2">-</Text>
            </TouchableOpacity>
            <Text className="text-lg font-semibold">{personCount}</Text>
            <TouchableOpacity
              onPress={increasePerson}
              className="bg-gray-200 px-3 py-1 rounded-full"
            >
              <Text className="text-xl mx-2">+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-gray-500 text-xs">Total Price</Text>
            <Text className="text-orange-500 text-xl font-bold">
              ${totalPrice}{" "}
              <Text className="text-xs text-gray-400">/total</Text>
            </Text>
          </View>

          <TouchableOpacity
            className="bg-orange-500 px-6 py-3 rounded-full"
            onPress={() => {
                router.push(`/tabs/bookmarks?id=${data.id}`);
            }}
          >
            <Text className="text-white font-semibold text-base">
              Order Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ListingDetail;
