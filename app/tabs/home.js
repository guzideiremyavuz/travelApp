import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import CategoryButtons from "../../components/CategoryButtons";
import YouMightLike from "../../components/YouMightLike";
import RecommendedPlaces from "../../components/RecomendedPlaces";
import { useRouter } from "expo-router";
import { useState } from "react";


const Home = () => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const router = useRouter();

  const onCatChanged = (category) => {
    console.log("Selected Category:", category);
  };

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: Colors.bgColor }}
      contentContainerStyle={{ padding: 16, paddingTop: 24 }}
    >
      <Text className="text-black text-left text-4xl font-extrabold leading-tight">
        Let's pack for{"\n"}your trip
      </Text>

      <Text className="text-grey-100 text-left text-lg leading-tight opacity-50 mt-4">
        Use one of our suggestions or make a{"\n"}list of what a pack
      </Text>

      <View className="flex-row items-center bg-white p-2 rounded-lg mt-4 mb-4">
        <Ionicons name="search" size={28} color={"#CCCCCC"} />
        <TextInput
          placeholder="Search location"
          className="flex-1 text-grey-300 text-lg"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => {
            if (searchQuery.trim().length > 0) {
              router.push(`/search/${searchQuery}`);
            }
          }}
        />
        <TouchableOpacity
          onPress={() => {}}
          className="px-2 py-2 rounded-lg border border-[#ff7f36] ml-auto"
          style={{ backgroundColor: Colors.primaryColor }}
        >
          <Ionicons name="options" size={28} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <CategoryButtons onCategoryChanged={onCatChanged} />

     
      <RecommendedPlaces />

      
      <YouMightLike />
    </ScrollView>
  );
};

export default Home;
