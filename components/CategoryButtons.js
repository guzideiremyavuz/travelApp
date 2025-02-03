import { Text, TouchableOpacity, View } from "react-native";
import React, { useState, useRef } from "react";
import Categories from "../data/Categories.js";
import Colors from "../constants/Colors"; 

const CategoryButtons = () => {
  const itemRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectCategory = (index) => {
    setActiveIndex(index);
    console.log(index);
  };

  return (
    <View>
      <View className="flex-row items-center justify-center">
        {Categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            ref={(el) => (itemRef.current[index] = el)}
            onPress={() => handleSelectCategory(index)}
            className={`px-4 py-2 rounded-lg border ${
              activeIndex === index
                ? `bg-[${Colors.primaryColor}] border-[${Colors.primaryColor}]`
                : "bg-transparent border-gray-400" 
            }
             ${index !== Categories.length - 1 ? "mr-1" : ""}
            `}
            style={{
              backgroundColor: activeIndex === index ? Colors.primaryColor : "transparent", 
              borderColor: activeIndex === index ? Colors.primaryColor : "#CCCCCC",
              borderWidth: 1, 
            }}
          >
            <Text
              className={`text-sm font-medium ${
                activeIndex === index
                ? "text-white" 
                : "text-gray-600"
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
