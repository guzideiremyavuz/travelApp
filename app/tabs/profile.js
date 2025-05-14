import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useUser } from "../../context/UserContext";
import { useRouter } from "expo-router";
import UserInfo from "../profile/userInfo";
import Reservations from "../profile/reservations";



export default function Profile() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("reservations");

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
    <ScrollView className="flex-1 bg-white px-6 pt-10">
      <Text className="text-2xl font-bold mb-4">Welcome, {user.name}!</Text>

      {/* Sekme butonları */}
      <View className="flex-row justify-around mb-4">
        <TouchableOpacity
          onPress={() => setActiveTab("reservations")}
          className={`px-4 py-2 rounded-full ${activeTab === "reservations" ? "bg-orange-500" : "bg-gray-200"}`}
        >
          <Text className={activeTab === "reservations" ? "text-white font-bold" : "text-gray-600"}>
            My Reservations
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("info")}
          className={`px-4 py-2 rounded-full ${activeTab === "info" ? "bg-orange-500" : "bg-gray-200"}`}
        >
          <Text className={activeTab === "info" ? "text-white font-bold" : "text-gray-600"}>
            My Info
          </Text>
        </TouchableOpacity>
      </View>

      {/* Aktif sekmeye göre bileşen göster */}
      {activeTab === "reservations" && <Reservations userId={user.id} />}
      {activeTab === "info" && <UserInfo user={user} />}

      {/* Çıkış butonu */}
      <TouchableOpacity
        onPress={() => setUser(null)}
        className="bg-gray-300 px-6 py-3 rounded-full mt-10 mb-10"
      >
        <Text className="text-black font-semibold text-center">Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
