import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Tabs, Stack, useRouter } from "expo-router";
import "../global.css";
import home from "./tabs/home";

const Page = () => {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Image
        source={require("../assets/traveller.png")}
        className="h-64 w-64"
        resizeMode="contain"
      />
      <Text className="text-black text-center text-4xl font-extrabold leading-tight">
        Plan Your Perfect Adventure
      </Text>
      <Text className="text-grey-100 text-center text-lg leading-tight opacity-50 mt-4">
        This app helps you create unforgettable travel experiences by organizing customized trip plans for top destinations around the world
      </Text>
      <TouchableOpacity
        className="w-56 h-14 bg-black mt-6 justify-center items-center rounded-lg"
        onPress={() => router.push("/tabs/home")}
      >
        <Text className="text-white text-xl font-semibold">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;
