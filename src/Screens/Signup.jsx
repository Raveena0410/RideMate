import React, { useState } from "react";
import axios from "axios";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // =========================
  // SIGNUP FUNCTION
  // =========================

  const handleSignup = async () => {
    // Check empty fields
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    // Check password
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      console.log("Creating account...");

      // Send data to backend
      const response = await axios.post(
        "http://192.168.100.79:5000/api/register",
        {
          name: name,
          email: email,
          phone: phone,
          password: password,
        }
      );

      console.log("Signup response:", response.data);

      // Account created successfully
      alert("Account created successfully!");

      // Go to Home
      router.replace("/");

    } catch (error) {
      console.error("Signup error:", error);

      if (error.response) {
        console.log(
          "Backend error:",
          error.response.data
        );

        alert(
          error.response.data.message ||
          "Signup failed"
        );
      } else {
        alert(
          "Unable to connect to the server. Please check that your backend is running."
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={25}
              color="#000"
            />
          </TouchableOpacity>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Ionicons
              name="car-sport"
              size={45}
              color="#000"
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>
            Create Account
          </Text>

          <Text style={styles.subtitle}>
            Join RideShare and start your journey
          </Text>

          {/* Name */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#777"
            />

            <TextInput
              style={styles.input}
              placeholder="Full name"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#777"
            />

            <TextInput
              style={styles.input}
              placeholder="Email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Phone */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="call-outline"
              size={20}
              color="#777"
            />

            <TextInput
              style={styles.input}
              placeholder="Phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#777"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
              onPress={() =>
                setShowPassword(!showPassword)
              }
            >
              <Ionicons
                name={
                  showPassword
                    ? "eye-outline"
                    : "eye-off-outline"
                }
                size={20}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#777"
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />

            <TouchableOpacity
              onPress={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              <Ionicons
                name={
                  showConfirmPassword
                    ? "eye-outline"
                    : "eye-off-outline"
                }
                size={20}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          {/* Create Account Button */}
          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignup}
          >
            <Text style={styles.signupButtonText}>
              Create Account
            </Text>
          </TouchableOpacity>

          {/* OR */}
          <View style={styles.orContainer}>
            <View style={styles.line} />

            <Text style={styles.orText}>
              OR
            </Text>

            <View style={styles.line} />
          </View>

          {/* Google */}
          <TouchableOpacity
            style={styles.googleButton}
          >
            <Ionicons
              name="logo-google"
              size={20}
              color="#000"
            />

            <Text style={styles.googleText}>
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Login */}
          <View style={styles.loginContainer}>
            <Text style={styles.accountText}>
              Already have an account?{" "}
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/login")}
            >
              <Text style={styles.loginText}>
                Login
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContainer: {
    flexGrow: 1,
  },

  content: {
    paddingHorizontal: 25,
    paddingVertical: 25,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
  },

  inputContainer: {
    height: 55,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },

  signupButton: {
    height: 55,
    borderRadius: 12,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  signupButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },

  orText: {
    marginHorizontal: 10,
    color: "#777",
  },

  googleButton: {
    height: 55,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  googleText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

  accountText: {
    color: "#777",
  },

  loginText: {
    fontWeight: "700",
  },
});