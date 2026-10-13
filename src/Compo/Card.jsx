
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const API_URL = "http://10.67.7.103:5000";

export default function Card() {
  const router = useRouter();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);

  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [bookingRideId, setBookingRideId] = useState(null);

  // Check login before allowing an action.
  const requireLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        return token;
      }

      Alert.alert(
        "Login Required",
        "Please log in to continue.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Login",
            onPress: () => router.push("/login"),
          },
        ]
      );

      return null;
    } catch (error) {
      console.log("Login check error:", error.message);
      Alert.alert("Error", "Unable to check your login. Please try again.");
      return null;
    }
  };

  // Search rides.
  const searchRides = async () => {
    const token = await requireLogin();

    if (!token) return;

    if (!from.trim() || !to.trim() || !date.trim()) {
      Alert.alert("Missing details", "Enter From, To and Date.");
      return;
    }

    try {
      setLoading(true);
      setRides([]);

      const response = await axios.get(`${API_URL}/api/rides`, {
        timeout: 15000,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allRides = response.data.rides || [];

      const matchedRides = allRides.filter((ride) => {
        const sameFrom =
          ride.from?.trim().toLowerCase() ===
          from.trim().toLowerCase();

        const sameTo =
          ride.to?.trim().toLowerCase() ===
          to.trim().toLowerCase();

        const sameDate = ride.date === date.trim();

        return (
          sameFrom &&
          sameTo &&
          sameDate &&
          Number(ride.availableSeats) >= passengers
        );
      });

      setRides(matchedRides);

      if (matchedRides.length === 0) {
        Alert.alert("No rides found", "Try different search details.");
      }
    } catch (error) {
      console.log(
        "Search rides error:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        await AsyncStorage.removeItem("token");

        Alert.alert(
          "Session expired",
          "Please log in again.",
          [
            { text: "OK", onPress: () => router.replace("/login") },
          ]
        );
      } else {
        Alert.alert(
          "Error",
          error.response?.data?.message ||
            "Unable to fetch rides. Check that your backend is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Book a ride.
  const bookRide = async (ride) => {
    const token = await requireLogin();

    if (!token) return;

    if (!passengerName.trim() || !passengerPhone.trim()) {
      Alert.alert(
        "Passenger details",
        "Enter your name and phone number before booking."
      );
      return;
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(passengerPhone.trim())) {
      Alert.alert(
        "Invalid phone number",
        "Please enter a valid phone number."
      );
      return;
    }

    try {
      setBookingRideId(ride._id);

      const response = await axios.post(
        `${API_URL}/api/bookings`,
        {
          rideId: ride._id,
          passengerName: passengerName.trim(),
          passengerPhone: passengerPhone.trim(),
          seatsBooked: passengers,
        },
        {
          timeout: 15000,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert(
        "Booking Successful!",
        response.data.message || "Your ride has been booked."
      );

      // Refresh results to get the actual remaining seats.
      await searchRides();
    } catch (error) {
      console.log(
        "Booking error:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        await AsyncStorage.removeItem("token");

        Alert.alert(
          "Session expired",
          "Please log in again.",
          [
            { text: "OK", onPress: () => router.replace("/login") },
          ]
        );
      } else {
        Alert.alert(
          "Booking Failed",
          error.response?.data?.message ||
            "Could not book this ride. Please try again."
        );
      }
    } finally {
      setBookingRideId(null);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Find a Ride</Text>

      <Text style={styles.subtitle}>
        Choose the ride that works best for you.
      </Text>

      <Text style={styles.label}>From</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter starting city"
        value={from}
        onChangeText={setFrom}
        autoCapitalize="words"
      />

      <Text style={styles.label}>To</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter destination city"
        value={to}
        onChangeText={setTo}
        autoCapitalize="words"
      />

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={setDate}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Number of passengers</Text>

      <View style={styles.passengerRow}>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => setPassengers((p) => Math.max(1, p - 1))}
          disabled={loading || bookingRideId !== null}
        >
          <Text style={styles.counterText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.passengerCount}>{passengers}</Text>

        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => setPassengers((p) => Math.min(6, p + 1))}
          disabled={loading || bookingRideId !== null}
        >
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Your name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={passengerName}
        onChangeText={setPassengerName}
        autoCapitalize="words"
      />

      <Text style={styles.label}>Your phone number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={passengerPhone}
        onChangeText={setPassengerPhone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        style={[
          styles.searchButton,
          loading && styles.disabledButton,
        ]}
        onPress={searchRides}
        disabled={loading || bookingRideId !== null}
      >
        <Text style={styles.buttonText}>
          {loading ? "Searching..." : "Search Rides"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.resultsHeading}>
        Available Rides ({rides.length})
      </Text>

      {rides.map((ride) => (
        <View key={ride._id} style={styles.rideCard}>
          <Text style={styles.route}>
            {ride.from} → {ride.to}
          </Text>

          <Text style={styles.details}>Date: {ride.date}</Text>
          <Text style={styles.details}>Time: {ride.time}</Text>

          <Text style={styles.details}>
            Seats available: {ride.availableSeats}
          </Text>

          <Text style={styles.price}>
            ₹{ride.pricePerSeat} per seat
          </Text>

          <Text style={styles.total}>
            Total for {passengers} passenger(s): ₹
            {Number(ride.pricePerSeat) * passengers}
          </Text>

          <TouchableOpacity
            style={[
              styles.bookButton,
              bookingRideId !== null && styles.disabledButton,
            ]}
            disabled={bookingRideId !== null || loading}
            onPress={() => bookRide(ride)}
          >
            <Text style={styles.buttonText}>
              {bookingRideId === ride._id
                ? "Booking..."
                : "Book This Ride"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    padding: 18,
  },
  heading: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#173B57",
    marginBottom: 6,
  },
  subtitle: {
    color: "#64748B",
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 7,
    marginTop: 10,
    color: "#243447",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8DEE6",
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 15,
  },
  passengerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
    marginBottom: 5,
  },
  counterButton: {
    backgroundColor: "#E2EAF2",
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: {
    fontSize: 24,
    color: "#173B57",
  },
  passengerCount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchButton: {
    backgroundColor: "#176B55",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 22,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  disabledButton: {
    opacity: 0.6,
  },
  resultsHeading: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#173B57",
    marginTop: 25,
    marginBottom: 12,
  },
  rideCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E1E7ED",
    padding: 16,
    marginBottom: 15,
  },
  route: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#173B57",
    marginBottom: 10,
  },
  details: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 5,
  },
  price: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#176B55",
    marginTop: 10,
  },
  total: {
    fontSize: 14,
    color: "#475569",
    marginTop: 5,
  },
  bookButton: {
    backgroundColor: "#176B55",
    padding: 13,
    borderRadius: 9,
    alignItems: "center",
    marginTop: 15,
  },
});

