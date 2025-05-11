import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";


export default function Search() {
  const { query } = useLocalSearchParams();
  const [searchTerm, setSearchTerm] = useState(query || "");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const res = await fetch("https://67f6443142d6c71cca613e64.mockapi.io/places");
        const data = await res.json();

        const filtered = (query || "").length === 0
        ? data.slice(0, 5)
        : data.filter((place) =>
            place.country.toLowerCase().includes(query.toLowerCase())
          );
        setFilteredPlaces(filtered);
        setSearchTerm(query || "");
      } catch (err) {
        console.log("Veri çekme hatası:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleSearch = () => {
    const newFiltered = filteredPlaces.filter((place) =>
      place.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlaces(newFiltered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/listing/${item.id}`)}
      className="mb-6"
    >
      <View className="mx-4 bg-white rounded-2xl shadow-lg">
        <Image
          source={{ uri: item.image }}
          className="w-full h-52 rounded-t-2xl"
        />
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-black font-semibold text-base">{item.title}</Text>
            <Text className="text-orange-500 font-bold">{item.price}</Text>
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
      
      <View className="px-4 mb-4">
  <View className="flex-row items-center bg-white p-3 rounded-lg shadow">
    <Ionicons name="search" size={20} color="#999" className="mr-2" />
    <TextInput
      placeholder="Search location"
      placeholderTextColor="#999"
      value={searchTerm}
      onChangeText={setSearchTerm}
      onSubmitEditing={handleSearch}
      className="flex-1 text-base text-black"
    />
    <Image
      source={require("../../assets/traveller.png")}
      style={{ width: 30, height: 30, marginLeft: 10 }}
      resizeMode="contain"
    />
  </View>
</View>



      <Text className="text-2xl font-bold px-4 mb-4">
        Results for "{searchTerm}"
      </Text>

      {loading ? (
        <Text className="px-4 text-gray-400">Loading...</Text>
      ) : filteredPlaces.length === 0 ? (
        <Text className="px-4 text-gray-400">No results found.</Text>
      ) : (
        <FlatList
          data={filteredPlaces}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      )}
    </View>
  );
}
