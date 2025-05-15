import React from "react";
import { View, Text } from "react-native";

export default function UserInfo({ user }) {
  if (!user) {
    return (
      <View className="mt-10">
        <Text className="text-center text-gray-500">No user information available.</Text>
      </View>
    );
  }

  return (
    <View className="mt-4 p-4 bg-gray-100 rounded-lg">
      <Text className="text-lg font-bold mb-2">Your Information</Text>

      <Text className="text-base mb-1">
        👤 Name: <Text className="font-semibold">{user.name}</Text>
      </Text>
      <Text className="text-base mb-1">
        📧 Email: <Text className="font-semibold">{user.email}</Text>
      </Text>
      
    </View>
  );
}
