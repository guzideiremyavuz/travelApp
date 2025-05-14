import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

export default function Reservations({ userId }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch(
          `https://67f6443142d6c71cca613e64.mockapi.io/reservations?userId=${userId}`
        );
        const data = await res.json();
        setReservations(data);
      } catch (err) {
        console.error("Reservation fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchReservations();
  }, [userId]);

  const handleCancel = async (id) => {
    Alert.alert(
      "Cancel Reservation",
      "Are you sure you want to cancel this reservation?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await fetch(
                `https://67f6443142d6c71cca613e64.mockapi.io/reservations/${id}`,
                {
                  method: "DELETE",
                }
              );
              setReservations((prev) => prev.filter((r) => r.id !== id));
            } catch (err) {
              console.error("Failed to cancel reservation:", err);
            }
          },
        },
      ]
    );
  };

  const today = new Date();

  const isPast = (endDate) => new Date(endDate) < today;
  const isOngoing = (startDate, endDate) =>
    new Date(startDate) <= today && today <= new Date(endDate);
  const isUpcoming = (startDate) => new Date(startDate) > today;

  const renderList = (title, list) => (
    <View className="mb-6">
      <Text className="text-lg font-bold mb-2">{title}</Text>
      {list.length === 0 ? (
        <Text className="text-gray-500">No reservations.</Text>
      ) : (
        list.map((item) => (
          <View key={item.id} className="mb-3 p-3 bg-gray-100 rounded-lg">
            <Text className="font-semibold">{item.placeName}</Text>
            <Text className="text-sm text-gray-600">
              {item.startDate} → {item.endDate}
            </Text>
            <Text className="text-sm text-gray-600">
              {item.personCount} person(s), check-in: {item.checkInTime}
            </Text>
            <Text className="text-sm text-orange-500 font-bold">
              Total: ${item.totalPrice}
            </Text>

            {/* Sadece upcoming ise iptal edilsin */}
            {isUpcoming(item.startDate) && (
              <TouchableOpacity
                onPress={() => handleCancel(item.id)}
                className="mt-2 bg-red-500 px-4 py-2 rounded-full self-start"
              >
                <Text className="text-white font-semibold text-sm">Cancel Reservation</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
    </View>
  );

  if (loading) {
    return (
      <View className="mt-6">
        <Text className="text-center text-gray-400">Loading reservations...</Text>
      </View>
    );
  }

  const past = reservations.filter((r) => isPast(r.endDate));
  const ongoing = reservations.filter((r) =>
    isOngoing(r.startDate, r.endDate)
  );
  const upcoming = reservations.filter((r) => isUpcoming(r.startDate));

  return (
    <View>
      {renderList("Ongoing Trips", ongoing)}
      {renderList("Upcoming Reservations", upcoming)}
      {renderList("Past Trips", past)}
    </View>
  );
}
