
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const API_URL = "http://YOUR_COMPUTER_IP:5000/api/rides";

export default function OfferRide() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState(1);
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (
      !from.trim() ||
      !to.trim() ||
      !date.trim() ||
      !time.trim() ||
      !price.trim()
    ) {
      Alert.alert("Missing details", "Please fill in all fields.");
      return;
    }

    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      Alert.alert("Invalid route", "Departure and destination must differ.");
      return;
    }

    if (!Number.isFinite(Number(price)) || Number(price) < 0) {
      Alert.alert("Invalid price", "Please enter a valid price.");
      return;
    }

    const rideData = {
      from: from.trim(),
      to: to.trim(),
      date: date.trim(),
      time: time.trim(),
      availableSeats: seats,
      pricePerSeat: Number(price),
    };

    setLoading(true);

    try {
      const response = await axios.post(API_URL, rideData);

      Alert.alert(
        "Success",
        response.data.message || "Your ride has been published!"
      );

      setFrom("");
      setTo("");
      setDate("");
      setTime("");
      setSeats(1);
      setPrice("");
    } catch (error) {
      console.log(
        "Publish ride error:",
        error.response?.data || error.message
      );

      Alert.alert(
        "Unable to publish",
        error.response?.data?.message ||
          "Check your backend server and network connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Offer a Ride</Text>
        <Text style={styles.subtitle}>
          Share your journey with passengers
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>From</Text>
        <View style={styles.inputBox}>
          <View style={styles.startDot} />
          <TextInput
            style={styles.input}
            placeholder="Enter departure location"
            placeholderTextColor="#9CA3AF"
            value={from}
            onChangeText={setFrom}
          />
        </View>

        <Text style={styles.label}>To</Text>
        <View style={styles.inputBox}>
          <View style={styles.destinationDot} />
          <TextInput
            style={styles.input}
            placeholder="Enter destination"
            placeholderTextColor="#9CA3AF"
            value={to}
            onChangeText={setTo}
          />
        </View>

        <Text style={styles.label}>Travel Date</Text>
        <TextInput
          style={styles.normalInput}
          placeholder="DD/MM/YYYY"
          placeholderTextColor="#9CA3AF"
          value={date}
          onChangeText={setDate}
        />

        <Text style={styles.label}>Departure Time</Text>
        <TextInput
          style={styles.normalInput}
          placeholder="08:00 AM"
          placeholderTextColor="#9CA3AF"
          value={time}
          onChangeText={setTime}
        />

        <Text style={styles.label}>Available Seats</Text>
        <View style={styles.seatContainer}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setSeats((s) => Math.max(1, s - 1))}
          >
            <Text style={styles.counterText}>−</Text>
          </TouchableOpacity>

          <View style={styles.seatInfo}>
            <Text style={styles.seatNumber}>{seats}</Text>
            <Text style={styles.seatText}>
              {seats === 1 ? "seat" : "seats"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setSeats((s) => Math.min(6, s + 1))}
          >
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Price per Passenger</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.rupee}>₹</Text>
          <TextInput
            style={styles.priceInput}
            placeholder="500"
            placeholderTextColor="#9CA3AF"
            keyboardType="decimal-pad"
            value={price}
            onChangeText={setPrice}
          />
        </View>

        <TouchableOpacity
          style={[styles.publishButton, loading && styles.disabledButton]}
          onPress={handlePublish}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.publishText}>🚗 Publish Ride</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  content: {
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#172B4D",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B7280",
  },
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 30,
    padding: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#172B4D",
    marginTop: 14,
    marginBottom: 8,
  },
  inputBox: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E1E6EF",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  startDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1769E0",
    marginRight: 12,
  },
  destinationDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: "#172B4D",
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#172B4D",
  },
  normalInput: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E1E6EF",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#172B4D",
  },
  seatContainer: {
    height: 55,
    borderWidth: 1,
    borderColor: "#E1E6EF",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  counterButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EAF3FF",
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1769E0",
  },
  seatInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  seatNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#172B4D",
  },
  seatText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 6,
  },
  priceContainer: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E1E6EF",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  rupee: {
    fontSize: 18,
    fontWeight: "700",
    color: "#172B4D",
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
    fontSize: 15,
    color: "#172B4D",
  },
  publishButton: {
    height: 54,
    backgroundColor: "#1769E0",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
  },
  disabledButton: {
    opacity: 0.7,
  },
  publishText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
