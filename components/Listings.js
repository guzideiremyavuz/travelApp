import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ListingType } from "../types/listingType";
import Colors, { primaryColor, black, white,bgColor } from "../constants/Colors";
import { Ionicons} from  "@expo/vector-icons"

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

const Listings = ({ listings }) => {
  const renderItems = ({ item }) => {
    return (
      <TouchableOpacity>
      <View className="flex-1 justify-center items-center px-6"
      style={{backgroundColor:Colors.white}}>
        <Image
          source={imageMap[item.id]} 
          className="w-64 h-40 rounded-lg"
        />
        <Text className="text-black text-xl font-bold">{item.name}</Text>
        <View className="absolute top-[185px] right-[30px] p-2 rounded-full"
        style={{backgroundColor: Colors.primaryColor,
          borderWidth:2,
          borderColor:Colors.white
        }}>
          <Ionicons name="bookmark-outline" size={24} color={Colors.white}/>
        </View>
      </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1  items-center justify-center">
      <FlatList 
        data={listings}
        renderItem={renderItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10,bottom:72 }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({});
