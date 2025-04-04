import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter, Link} from "expo-router";
import { ListingType } from "../types/listingType";
import Colors, {
  primaryColor,
  black,
  white,
  bgColor,
} from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const imageMap = {
  1: require("../assets/id1.jpg"),
  2: require("../assets/id2.jpg"),
  3: require("../assets/id3.jpg"),
  4: require("../assets/id4.jpg"),
  5: require("../assets/id5.jpg"),
  6: require("../assets/id6.jpg"),
  7: require("../assets/id7.jpg"),
  8: require("../assets/id8.jpg"),
  9: require("../assets/id9.jpg"),
  10: require("../assets/id10.jpg"),
};

type Props={
  listings: any[];
}

const Listings = ({ listings }) => {
  const router = useRouter();
  const renderItems = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild> 
      <TouchableOpacity onPress={() => router.push(`/listing/${item.id}`)}>
        <View
          className="items-center px-6 pb-8"
          style={{ backgroundColor: Colors.bgColor }}
        >
          <View className="relative pb-8">
            <Image
              source={imageMap[item.imageId]}
              className="w-[250px] h-[160px] rounded-2xl"
            />

            <View className="absolute -bottom-3 self-center w-[230px] bg-white rounded-2xl px-4 py-3 shadow-md">
              
              <View className="flex-row justify-between items-center">
                <View>
                <Text className="text-black text-base font-bold">{item.name}</Text>
                <Text className="text-gray-500">{item.location}</Text>
                </View>
                <Text className="text-orange-500 font-bold">${item.price}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      </Link>
    );
  };

  return (
    <FlatList
      data={listings}
      renderItem={renderItems}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default Listings;

const styles = StyleSheet.create({});
