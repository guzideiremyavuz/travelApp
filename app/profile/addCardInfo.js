import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../../context/UserContext";

export default function AddCardInfo() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const saveCardInfo = async () => {
    if (!cardNumber || !expiry || !cvv) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch(`https://67f6443142d6c71cca613e64.mockapi.io/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardNumber, expiry, cvv }),
      });

      const updatedUser = await res.json();
      setUser(updatedUser);
      Alert.alert("Success", "Card info saved successfully!");
      router.back();
    } catch (err) {
      Alert.alert("Error", "Failed to save card info.");
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4">Enter Credit Card Info</Text>

      <TextInput
        placeholder="Card Number"
        keyboardType="numeric"
        maxLength={16}
        className="border p-3 mb-3 rounded"
        onChangeText={setCardNumber}
        value={cardNumber}
      />
      <TextInput
        placeholder="Expiry (MM/YY)"
        className="border p-3 mb-3 rounded"
        onChangeText={setExpiry}
        value={expiry}
      />
      <TextInput
        placeholder="CVV"
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
        className="border p-3 mb-6 rounded"
        onChangeText={setCvv}
        value={cvv}
      />

      <TouchableOpacity
        onPress={saveCardInfo}
        className="bg-orange-500 py-3 rounded-full"
      >
        <Text className="text-white text-center font-bold">Save Card</Text>
      </TouchableOpacity>
    </View>
  );
}
