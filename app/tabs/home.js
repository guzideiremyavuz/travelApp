import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { primaryColor } from "../../constants/Colors";
import CategoryButtons from "../../components/CategoryButtons";
import Listings from "../../components/Listings";
import destinationCategories from "../../data/destinationCategories";

const Home = () => {
  console.log("Destination Categories:", destinationCategories);

  const onCatChanged = (category) => {
    console.log("Selected Category:", category);
  };

  return (
    <View className="flex-1 justify-start items-start p-4 pt-6">
      <Text className="text-black text-left text-4xl font-extrabold leading-tight">
        Let's pack for{"\n"}your trip
      </Text>
      <Text className="text-grey-100 text-left text-lg leading-tight opacity-50 mt-4">
        Use one of our suggestions or make a{"\n"}list of what a pack
      </Text>
      <View className="flex-row items-center bg-white p-2 rounded-lg mt-4">
        <Ionicons name="search" size={18} />
        <TextInput
          placeholder="Search location"
          className="flex-1 text-grey-300 text-lg"
        />

        <TouchableOpacity onPress={() => {}} className="">
          <Ionicons name="options" size={28} color={primaryColor} />
        </TouchableOpacity>
      </View>

      <CategoryButtons onCategoryChanged={onCatChanged} />
      <Listings listings={destinationCategories} />
    </View>
  );
};

export default Home;
