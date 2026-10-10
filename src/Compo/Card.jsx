import React, { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";

export default function Card() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  const [inputType, setInputType] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const openInput = (type) => {
    setInputType(type);

    if (type === "from") {
      setInputValue(from);
    } else if (type === "to") {
      setInputValue(to);
    } else if (type === "date") {
      setInputValue(date);
    }
  };

  const saveInput = () => {
    if (!inputValue.trim()) {
      Alert.alert("Required", "Please enter a value.");
      return;
    }

    if (inputType === "from") {
      setFrom(inputValue);
    }

    if (inputType === "to") {
      setTo(inputValue);
    }

    if (inputType === "date") {
      setDate(inputValue);
    }

    setInputType(null);
    setInputValue("");
  };

  const increasePassengers = () => {
    if (passengers < 6) {
      setPassengers(passengers + 1);
    }
  };

  const decreasePassengers = () => {
    if (passengers > 1) {
      setPassengers(passengers - 1);
    }
  };

  const handleSearch = () => {
    if (!from) {
      Alert.alert("Missing", "Please select your starting point.");
      return;
    }

    if (!to) {
      Alert.alert("Missing", "Please select your destination.");
      return;
    }

    if (!date) {
      Alert.alert("Missing", "Please select your travel date.");
      return;
    }

    router.push({
      pathname: "/explore",
      params: { from, to, date, passengers: String(passengers) },
    });
  };

  return (
    <View style={styles.card}>

      <Text style={styles.title}>Find your ride</Text>

      <Text style={styles.subtitle}>
        Travel together. Save more.
      </Text>

      {/* FROM */}
      <TouchableOpacity
        style={styles.locationBox}
        activeOpacity={0.7}
        onPress={() => openInput("from")}
      >
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>📍</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.label}>From</Text>

          <Text
            style={[
              styles.location,
              !from && styles.placeholder,
            ]}
          >
            {from || "Choose your starting point"}
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      {/* TO */}
      <TouchableOpacity
        style={styles.locationBox}
        activeOpacity={0.7}
        onPress={() => openInput("to")}
      >
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>📍</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.label}>To</Text>

          <Text
            style={[
              styles.location,
              !to && styles.placeholder,
            ]}
          >
            {to || "Where are you going?"}
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      {/* DATE + PASSENGERS */}
      <View style={styles.detailsRow}>

        {/* DATE */}
        <TouchableOpacity
          style={styles.detailBox}
          activeOpacity={0.7}
          onPress={() => openInput("date")}
        >
          <Text style={styles.smallIcon}>📅</Text>

          <View style={styles.detailContent}>
            <Text style={styles.label}>Date</Text>

            <Text
              style={[
                styles.detailText,
                !date && styles.placeholder,
              ]}
            >
              {date || "Select date"}
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* PASSENGERS */}
        <View style={styles.detailBox}>

          <Text style={styles.smallIcon}>👤</Text>

          <View style={styles.detailContent}>
            <Text style={styles.label}>Passengers</Text>

            <View style={styles.passengerRow}>

              <TouchableOpacity
                style={styles.counterButton}
                onPress={decreasePassengers}
              >
                <Text style={styles.counterText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.passengerNumber}>
                {passengers}
              </Text>

              <TouchableOpacity
                style={styles.counterButton}
                onPress={increasePassengers}
              >
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>

            </View>
          </View>

        </View>

      </View>

      {/* SEARCH */}
      <TouchableOpacity
        style={styles.searchButton}
        activeOpacity={0.8}
        onPress={handleSearch}
      >
        <Text style={styles.searchText}>
          🔍 Search rides
        </Text>
      </TouchableOpacity>

      {/* INPUT POPUP */}
      {inputType && (
        <View style={styles.inputPopup}>

          <Text style={styles.popupTitle}>
            {inputType === "from" && "Where are you starting from?"}
            {inputType === "to" && "Where are you going?"}
            {inputType === "date" && "When are you travelling?"}
          </Text>

          <TextInput
            style={styles.popupInput}
            placeholder={
              inputType === "date"
                ? "DD/MM/YYYY"
                : "Enter location"
            }
            placeholderTextColor="#9CA3AF"
            value={inputValue}
            onChangeText={setInputValue}
            autoFocus
          />

          <View style={styles.popupButtons}>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setInputType(null);
                setInputValue("");
              }}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveInput}
            >
              <Text style={styles.saveText}>
                Done
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      )}

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

  textContainer: {
    flex: 1,
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

  placeholder: {
    color: "#9CA3AF",
    fontWeight: "400",
  },

  arrow: {
    fontSize: 24,
    color: "#9CA3AF",
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

  detailContent: {
    flex: 1,
  },

  detailText: {
    fontSize: 14,
    color: "#172B4D",
    fontWeight: "500",
  },

  passengerRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  counterButton: {
    width: 26,
    height: 26,
    borderRadius: 13,

    backgroundColor: "#EAF3FF",

    alignItems: "center",
    justifyContent: "center",
  },

  counterText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1769E0",
  },

  passengerNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#172B4D",

    marginHorizontal: 10,
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

  inputPopup: {
    marginTop: 16,

    backgroundColor: "#F8FAFC",

    borderRadius: 14,

    padding: 16,

    borderWidth: 1,
    borderColor: "#E1E7EF",
  },

  popupTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#172B4D",

    marginBottom: 12,
  },

  popupInput: {
    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#D9E0EA",

    borderRadius: 10,

    paddingHorizontal: 12,
    paddingVertical: 12,

    fontSize: 15,
    color: "#172B4D",
  },

  popupButtons: {
    flexDirection: "row",
    gap: 10,

    marginTop: 12,
  },

  cancelButton: {
    flex: 1,

    paddingVertical: 12,

    borderRadius: 10,

    alignItems: "center",

    backgroundColor: "#E5E7EB",
  },

  cancelText: {
    color: "#374151",
    fontWeight: "600",
  },

  saveButton: {
    flex: 1,

    paddingVertical: 12,

    borderRadius: 10,

    alignItems: "center",

    backgroundColor: "#1769E0",
  },

  saveText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
