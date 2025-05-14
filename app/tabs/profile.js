import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useUser } from "../../context/UserContext";
import { useRouter } from "expo-router";

export default function Profile() {
  const { user, setUser } = useUser();
  const router = useRouter();

  if (!user?.id) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-6">
        <Text className="text-xl font-bold text-gray-700 text-center mb-3">
          You are not logged in.
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/profile/auth")}
          className="bg-orange-500 px-6 py-3 rounded-full"
        >
          <Text className="text-white font-semibold">Login / Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold mb-4">
        Welcome, {user?.name || "User"}!
      </Text>
      <Text className="text-base text-gray-600 mb-8">
        {user?.email || "No email"}
      </Text>

      <TouchableOpacity
        onPress={() => setUser(null)}
        className="bg-gray-300 px-6 py-3 rounded-full"
      >
        <Text className="text-black font-semibold">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
