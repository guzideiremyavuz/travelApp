import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs, Stack } from "expo-router";

const Page = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <View>
        <Text className="text-black text-center text-4xl font-extrabold leading-tight">
          Let's pack for your trip
        </Text>
      </View>
    </>
  );
};

export default Page;
