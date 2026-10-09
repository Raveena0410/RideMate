import React, { useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim();

    if (
      !normalizedName ||
      !normalizedEmail ||
      !normalizedPhone ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Missing details', 'Please fill in all fields.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        'Weak password',
        'Your password must contain at least 8 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Your passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${API_URL}/api/register`,
        {
          name: normalizedName,
          email: normalizedEmail,
          phone: normalizedPhone,
          password,
        },
        { timeout: 15000 }
      );

      Alert.alert(
        'Account created',
        'Your RideMate account is ready. Please log in.',
        [
          {
            text: 'Go to Login',
            onPress: () => router.replace('/login'),
          },
        ]
      );
    } catch (error) {
      let message = 'Unable to create your account. Please try again.';

      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.code === 'ECONNABORTED') {
        message = 'The server took too long to respond.';
      } else if (!error.response) {
        message =
          `Cannot connect to ${API_URL}. ` +
          'Check your backend server and API address.';
      }

      Alert.alert('Signup failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace('/')}
            accessibilityLabel="Back to home"
          >
            <Ionicons name="arrow-back" size={24} color="#172B4D" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="car-sport" size={42} color="#1769E0" />
            </View>
          </View>

          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>
            Join RideMate and travel together.
          </Text>

          <Text style={styles.label}>Full name</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#667085" />
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#98A2B3"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="name"
              editable={!loading}
            />
          </View>

          <Text style={styles.label}>Email address</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#667085" />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#98A2B3"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              editable={!loading}
            />
          </View>

          <Text style={styles.label}>Phone number</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={20} color="#667085" />
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#98A2B3"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoComplete="tel"
              editable={!loading}
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#667085"
            />
            <TextInput
              style={styles.input}
              placeholder="At least 8 characters"
              placeholderTextColor="#98A2B3"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="new-password"
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => setShowPassword((value) => !value)}
              disabled={loading}
              accessibilityLabel={
                showPassword ? 'Hide password' : 'Show password'
              }
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={21}
                color="#667085"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm password</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#667085"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your password again"
              placeholderTextColor="#98A2B3"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              autoComplete="new-password"
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() =>
                setShowConfirmPassword((value) => !value)
              }
              disabled={loading}
              accessibilityLabel={
                showConfirmPassword
                  ? 'Hide confirm password'
                  : 'Show confirm password'
              }
            >
              <Ionicons
                name={
                  showConfirmPassword
                    ? 'eye-off-outline'
                    : 'eye-outline'
                }
                size={21}
                color="#667085"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.signupButton, loading && styles.disabled]}
            onPress={handleSignup}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.signupButtonText}>Create account</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => router.push('/login')}
              disabled={loading}
            >
              <Text style={styles.loginLink}> Login</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>
            Your journey starts with RideMate.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 24,
  },
  content: {
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
    paddingHorizontal: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginBottom: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 18,
  },
  logoCircle: {
    width: 76,
    height: 76,
    borderRadius: 23,
    backgroundColor: '#E6F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 29,
    fontWeight: '800',
    color: '#172B4D',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#667085',
    textAlign: 'center',
    marginTop: 9,
    marginBottom: 22,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#344054',
    marginTop: 12,
    marginBottom: 8,
  },
  inputContainer: {
    minHeight: 53,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: '#D8DEE8',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 13,
    color: '#172B4D',
    fontSize: 14,
  },
  signupButton: {
    minHeight: 53,
    backgroundColor: '#1769E0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 25,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  disabled: {
    opacity: 0.65,
  },
  loginContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  loginText: {
    fontSize: 14,
    color: '#667085',
  },
  loginLink: {
    fontSize: 14,
    color: '#1769E0',
    fontWeight: '800',
  },
  footer: {
    textAlign: 'center',
    marginTop: 26,
    color: '#98A2B3',
    fontSize: 12,
  },
});