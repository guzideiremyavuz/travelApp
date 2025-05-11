import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";

const RecommendedPlaces = () => {
  const [recommendedData, setRecommendedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedData = async () => {
      try {
        const res = await fetch("https://67f6443142d6c71cca613e64.mockapi.io/recomendedPlaces");
        const json = await res.json();
        setRecommendedData(json);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedData();
  }, []);

  const renderItems = ({ item }) => (
    <Link href={`/recommendedplacedetail/${item.id}`} asChild>
      <TouchableOpacity className="mr-4">
        <View className="w-[250px] bg-white rounded-2xl shadow-md overflow-hidden">
          <Image
            source={{ uri: item.image }}
            className="w-full h-[160px]"
            resizeMode="cover"
          />
          <View className="p-4">
            <View className="flex-row justify-between items-start">
              <View className="flex-1 pr-2">
                <Text className="text-black text-base font-bold" numberOfLines={1}>
                  {item.name}
                </Text>
                <Text className="text-gray-500 text-sm" numberOfLines={1}>
                  {item.location}
                </Text>
              </View>
              <Text className="text-orange-500 font-bold text-sm">${item.price}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  if (loading) return null;

  return (
    <View className="mt-6 px-4">
      {/* Recommended başlığı solda ve view içinde */}
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-black text-xl font-bold">Recommended Places</Text>
        <Text className="text-gray-400">View all</Text>
      </View>

      {/* Kartlar */}
      <FlatList
        data={recommendedData}
        renderItem={renderItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default RecommendedPlaces;
