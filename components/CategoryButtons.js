import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useRef } from "react";
import "../global.css";
import destinationCategories from "../data/destinationCategories.js";
import { primaryColor, bgColor } from "../constants/Colors.js";

const CategoryButtons = () => {
  const itemRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectCategory = (index: number) => {
    setActiveIndex(index);
    console.log(index);
  };

  return (
    <View>
      <View className="flex-row items-center">
        {destinationCategories.map((item, index) => (
          <TouchableOpacity
            key={index}
            ref={(el) => itemRef.current[index] = el}
            onPress={() => handleSelectCategory(index)}
            className={`px-4 py-4 rounded-lg my-2 ${
              activeIndex === index ? `bg-[${primaryColor}]` : `bg-[${bgColor}]`
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                activeIndex == index ? "text-white" : "text-gray-500"
              }`}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CategoryButtons;

const styles = StyleSheet.create({});
