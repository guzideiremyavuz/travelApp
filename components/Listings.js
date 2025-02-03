import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import { ListingType } from "../types/listingType";

const Listings = ({ listings }) => {
  const renderItems = ({ item }) => {
    return (
      <View className="flex-1 justify-center items-center bg-white px-6">
        <Image
          source={{ uri: item.image }}
          className="w-[200px] h-[200px]"
          resizeMode="contain"
        />
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 items-center justify-center">
      <FlatList
        data={listings}
        renderItem={renderItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({});
