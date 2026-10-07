import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

export default function Header() {
  return (
    <View style={styles.header}>

      {/* Logo */}
      <Pressable
        onPress={() => router.push("/")}
        style={styles.logoContainer}
      >
        <Text style={styles.logoIcon}>🚗</Text>

        <Text style={styles.logo}>
          RideMate
        </Text>
      </Pressable>

      {/* Navigation Buttons */}
      <View style={styles.buttons}>

        {/* Offer Ride */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push("/offer-ride")}
        >
          <Text style={styles.buttonText}>
            Offer Ride
          </Text>
        </Pressable>

        {/* Login */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>
            Login
          </Text>
        </Pressable>

        {/* Sign Up */}
        <Pressable
          style={({ pressed }) => [
            styles.signupButton,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.signupText}>
            Sign Up
          </Text>
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    width: "100%",

    backgroundColor: "#FFFFFF",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 18,

    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",

    elevation: 3,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoIcon: {
    fontSize: 22,
    marginRight: 6,
  },

  logo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1769E0",
  },

  buttons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  button: {
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#EAF3FF",
  },

  buttonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1769E0",
  },

  signupButton: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#1769E0",
  },

  signupText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  pressed: {
    opacity: 0.6,
  },
});