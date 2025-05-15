import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useUser } from "../../context/UserContext";

export default function Bookmarks() {
  const { user } = useUser();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const router = useRouter();
  const { id, count } = useLocalSearchParams();
  const [personCount, setPersonCount] = useState(Number(count) || 1);
  const [placeData, setPlaceData] = useState(null);
  const [checkInTime, setCheckInTime] = useState("morning");

  const endpoints = [
    "https://67f6443142d6c71cca613e64.mockapi.io/recomendedPlaces",
    "https://67f6443142d6c71cca613e64.mockapi.io/places",
    "https://67f6443142d6c71cca613e64.mockapi.io/searchPlaces",
    "https://67f6443142d6c71cca613e64.mockapi.io/searchPlaces1",
    "https://67f6443142d6c71cca613e64.mockapi.io/searchPlaces2",
    "https://67f6443142d6c71cca613e64.mockapi.io/searchPlaces3",
  ];

  const handleDayPress = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (day.dateString < startDate) {
        setStartDate(day.dateString);
      } else {
        setEndDate(day.dateString);
      }
    }
  };

  const getStayNights = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const getMarkedDates = () => {
    if (!startDate) return {};

    let marked = {
      [startDate]: {
        startingDay: true,
        color: "#FFA726",
        textColor: "white",
      },
    };

    if (endDate) {
      let current = new Date(startDate);
      const last = new Date(endDate);

      while (current < last) {
        const dateStr = current.toISOString().split("T")[0];
        if (dateStr !== startDate && dateStr !== endDate) {
          marked[dateStr] = { color: "#FFE0B2", textColor: "black" };
        }
        current.setDate(current.getDate() + 1);
      }

      marked[endDate] = {
        endingDay: true,
        color: "#FFA726",
        textColor: "white",
      };
    }

    return marked;
  };
  const getTotalPrice = () => {
    const pricePerPerson = parseFloat(placeData?.price || "0");
    const nights = getStayNights();
    return pricePerPerson * personCount * nights;
  };

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const all = await Promise.all(
          endpoints.map((url) => fetch(url).then((res) => res.json()))
        );
        const flat = all.flat();
        const found = flat.find((item) => item.id === id);
        setPlaceData(found);
      } catch (err) {
        console.error("Place fetch error:", err);
      }
    };

    if (id) fetchPlace();
  }, [id]);

  if (!id) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-8">
        <Text className="text-2xl font-bold text-gray-600 text-center mb-3">
          No vacation plan selected yet
        </Text>
        <Text className="text-base text-gray-400 text-center">
          Please pick a destination first and tap "Order Now" to set your stay
          dates.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4">Select Your Stay Dates</Text>
      <Calendar
        markingType={"period"}
        markedDates={getMarkedDates()}
        onDayPress={handleDayPress}
        minDate={new Date().toISOString().split("T")[0]}
        maxDate={"2025-9-30"}
      />

      <View className="mt-6">
        {startDate && (
          <Text className="text-base mb-2">Start Date: {startDate}</Text>
        )}
        {endDate && <Text className="text-base mb-2">End Date: {endDate}</Text>}
        {startDate && endDate && (
          <Text className="text-base font-semibold text-green-600">
            You’ll stay {getStayNights()}{" "}
            {getStayNights() === 1 ? "night" : "nights"}
          </Text>
        )}

        {placeData && startDate && endDate && (
          <Text className="text-lg font-bold text-orange-500 mt-2">
            Total Price: ${getTotalPrice().toFixed(2)}
          </Text>
        )}
        <View className="mt-4 flex-row justify-center space-x-4">
          <TouchableOpacity
            onPress={() => setCheckInTime("morning")}
            className={`px-4 py-2 rounded-full ${
              checkInTime === "morning" ? "bg-orange-500" : "bg-gray-200"
            }`}
          >
            <Text
              className={
                checkInTime === "morning"
                  ? "text-white font-bold"
                  : "text-gray-600"
              }
            >
              Morning
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCheckInTime("evening")}
            className={`px-4 py-2 rounded-full ${
              checkInTime === "evening" ? "bg-orange-500" : "bg-gray-200"
            }`}
          >
            <Text
              className={
                checkInTime === "evening"
                  ? "text-white font-bold"
                  : "text-gray-600"
              }
            >
              Evening
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={async () => {
          const todayStr = new Date().toISOString().split("T")[0];
          if (!user?.cardNumber || !user?.expiry || !user?.cvv) {
            alert(
              "Please add your credit card info before making a reservation."
            );
            router.push("/profile/addCardInfo");
            return;
          }

          if (startDate < todayStr) {
            alert("You cannot make a reservation in the past.");
            return;
          }

          if (!startDate || !endDate || !placeData || !user?.id) return;

          const payload = {
            userId: Number(user.id),
            placeId: placeData.id,
            placeName: placeData.name || placeData.title || "Unknown Place",
            startDate,
            endDate,
            checkInTime,
            personCount,
            totalPrice: getTotalPrice(),
          };

          try {
            const res = await fetch(
              "https://67f6443142d6c71cca613e64.mockapi.io/reservations",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              }
            );

            if (res.ok) {
              alert("Reservation saved!");
              router.push("/tabs/profile");
            } else {
              alert("Failed to save reservation.");
            }
          } catch (err) {
            console.error("Reservation error:", err);
            alert("Error occurred.");
          }
        }}
        className="mt-6 bg-orange-500 py-3 px-6 rounded-full"
      >
        <Text className="text-white text-center font-bold">Confirm Dates</Text>
      </TouchableOpacity>
    </View>
  );
}
