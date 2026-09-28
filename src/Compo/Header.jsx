import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { router } from "expo-router";

const Header = () => {
  return (
    <View style={styles.header}>

      {/* Logo */}
      <Pressable
        onPress={() => router.push("/")}
        style={styles.logoContainer}
      >
        <Text style={styles.logoIcon}>🚗</Text>

        <Text style={styles.logoText}>
          RideMate
        </Text>
      </Pressable>

      {/* Right side */}
      <View style={styles.rightContainer}>

        {/* Login */}
        <Pressable
          onPress={() => router.push("/login")}
          style={({ pressed }) => [
            styles.loginButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.loginText}>
            Login
          </Text>
        </Pressable>

        {/* Sign Up */}
        <Pressable
          onPress={() => router.push("/signup")}
          style={({ pressed }) => [
            styles.signupButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.signupText}>
            Sign Up
          </Text>
        </Pressable>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 20,

    backgroundColor: "#FFFFFF",

    borderBottomWidth: 1,
    borderBottomColor: "#E8EEF5",
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoIcon: {
    fontSize: 23,
    marginRight: 7,
  },

  logoText: {
    fontSize: 21,
    fontWeight: "700",
    color: "#1769E0",
  },

  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  loginButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },

  loginText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#172B4D",
  },

  signupButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,

    backgroundColor: "#1769E0",

    borderRadius: 8,
  },

  signupText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  pressed: {
    opacity: 0.7,
  },
});

export default Header;