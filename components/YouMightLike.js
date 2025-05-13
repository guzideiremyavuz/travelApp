import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";

const YouMightLike = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅ Doğru kullanım

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

      {data.map((item) => (
        <TouchableOpacity  
          key={item.id?.toString()} 
          onPress={() => router.push(`/listing/${item.id}`)} // ✅ Düzeltildi
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
          <Text className="text-orange-500 font-bold">{item.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default YouMightLike;
