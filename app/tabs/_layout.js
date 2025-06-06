import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export default function TabbarLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          padding: 0,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginBottom: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primaryColor,
        tabBarInactiveTintColor: Colors.black,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart-outline" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar-outline" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
