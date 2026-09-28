import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function Card() {
  const router = useRouter();

  const handleSearch = () => {
    Alert.alert(
      "Login required",
      "Please login or create an account to search for rides.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Login",
          onPress: () => router.push("/login"),
        },
        {
          text: "Sign Up",
          onPress: () => router.push("/signup"),
        },
      ]
    );
  };

  return (
    <View style={styles.card}>

      {/* Heading */}
      <Text style={styles.title}>
        Find your ride
      </Text>

      <Text style={styles.subtitle}>
        Travel together. Save more.
      </Text>

      {/* From */}
      <View style={styles.locationBox}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>📍</Text>
        </View>

        <View>
          <Text style={styles.label}>From</Text>
          <Text style={styles.location}>
            Choose your starting point
          </Text>
        </View>
      </View>

      {/* To */}
      <View style={styles.locationBox}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>📍</Text>
        </View>

        <View>
          <Text style={styles.label}>To</Text>
          <Text style={styles.location}>
            Where are you going?
          </Text>
        </View>
      </View>

      {/* Date + passengers */}
      <View style={styles.detailsRow}>

        <View style={styles.detailBox}>
          <Text style={styles.smallIcon}>📅</Text>

          <View>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.detailText}>Today</Text>
          </View>
        </View>

        <View style={styles.detailBox}>
          <Text style={styles.smallIcon}>👤</Text>

          <View>
            <Text style={styles.label}>Passengers</Text>
            <Text style={styles.detailText}>1 passenger</Text>
          </View>
        </View>

      </View>

      {/* Search button */}
      <TouchableOpacity
        style={styles.searchButton}
        activeOpacity={0.8}
        onPress={handleSearch}
      >
        <Text style={styles.searchText}>
          🔍  Search rides
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 20,

    marginHorizontal: 16,
    marginTop: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,

    elevation: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#172B4D",
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 5,
    marginBottom: 20,
  },

  locationBox: {
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E1E7EF",

    borderRadius: 12,

    padding: 13,

    marginBottom: 12,
  },

  iconCircle: {
    width: 36,
    height: 36,

    borderRadius: 18,

    backgroundColor: "#EAF3FF",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 12,
  },

  icon: {
    fontSize: 17,
  },

  label: {
    fontSize: 12,
    color: "#7A869A",
    marginBottom: 3,
  },

  location: {
    fontSize: 14,
    color: "#172B4D",
    fontWeight: "500",
  },

  detailsRow: {
    flexDirection: "row",
    gap: 10,

    marginBottom: 16,
  },

  detailBox: {
    flex: 1,

    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E1E7EF",

    borderRadius: 12,

    padding: 12,
  },

  smallIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  detailText: {
    fontSize: 14,
    color: "#172B4D",
    fontWeight: "500",
  },

  searchButton: {
    backgroundColor: "#1769E0",

    paddingVertical: 15,

    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    marginTop: 2,
  },

  searchText: {
    color: "#FFFFFF",

    fontSize: 16,
    fontWeight: "700",
  },
});