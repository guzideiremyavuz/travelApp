import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../../context/UserContext";

export default function AuthScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const router = useRouter();

  const BASE_URL = "https://67f6443142d6c71cca613e64.mockapi.io/users";

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 6; // Example rule
  };

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    try {
      const resCheck = await fetch(BASE_URL);
      const users = await resCheck.json();
      const existing = users.find((u) => u.email === email);

      if (existing) {
        Alert.alert("Error", "This email is already registered.");
        return;
      }

      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!data?.id) throw new Error("Registration failed");

      await setUser(data);
      Alert.alert("Welcome", "Account created!");
      router.push("/tabs/home");
    } catch (err) {
      Alert.alert("Error", "Registration failed. Please try again.");
      console.error("Register error:", err);
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Email and password required.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch(BASE_URL);
      const users = await res.json();

      const found = users.find(
        (u) => u.email === email && u.password === password
      );

      if (found) {
        await setUser(found);
        Alert.alert("Welcome", `Welcome back, ${found.name}`);
        router.push("/tabs/home");
      } else {
        Alert.alert("Login Failed", "Incorrect email or password.");
      }
    } catch (err) {
      Alert.alert("Error", "Login failed. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white justify-center px-6"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text className="text-2xl font-bold text-center mb-6">Login / Register</Text>

      <TextInput
        placeholder="Name (only for register)"
        value={name}
        onChangeText={setName}
        className="border p-3 rounded mb-3"
        autoCapitalize="words"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="border p-3 rounded mb-3"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border p-3 rounded mb-6"
      />

      <TouchableOpacity
        onPress={handleRegister}
        className="bg-orange-500 p-3 rounded-full mb-3"
      >
        <Text className="text-white text-center font-bold">Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogin}
        className="border border-orange-500 p-3 rounded-full"
      >
        <Text className="text-orange-500 text-center font-bold">Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
