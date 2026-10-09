import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import axios from 'axios';

// Configure this URL in your project's root .env file.
// Example: EXPO_PUBLIC_API_URL=http://192.168.1.10:5000
const API_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      Alert.alert(
        'Missing details',
        'Please enter your email and password.'
      );
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/login`,
        {
          email: normalizedEmail,
          password,
        },
        { timeout: 15000 }
      );

      if (!res.data?.token) {
        throw new Error('Login token was not returned by the server.');
      }

      // Authentication succeeded. The token still needs to be
      // stored securely and attached to future protected API requests.
      Alert.alert('Login successful', 'Welcome back to RideMate!');

      router.replace('/');
    } catch (error) {
      let message = 'Something went wrong. Please try again.';

      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.code === 'ECONNABORTED') {
        message = 'The server took too long to respond.';
      } else if (!error.response) {
        message =
          `Cannot connect to the backend at ${API_URL}. ` +
          'Check that the server is running and the API URL is correct.';
      } else if (error.message) {
        message = error.message;
      }

      Alert.alert('Login failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.replace('/')}
              accessibilityLabel="Back to home"
            >
              <Ionicons
                name="arrow-back"
                size={23}
                color="#172B4D"
              />
            </TouchableOpacity>

            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons
                  name="car-sport"
                  size={43}
                  color="#1769E0"
                />
              </View>
            </View>

            <Text style={styles.title}>Welcome back!</Text>

            <Text style={styles.subtitle}>
              Login to continue your journey with RideMate.
            </Text>

            <View style={styles.form}>
              <Text style={styles.label}>Email address</Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="#667085"
                />

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
                  returnKeyType="next"
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
                  placeholder="Enter your password"
                  placeholderTextColor="#98A2B3"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="current-password"
                  editable={!loading}
                  returnKeyType="go"
                  onSubmitEditing={handleLogin}
                />

                <TouchableOpacity
                  onPress={() => setShowPassword((value) => !value)}
                  accessibilityLabel={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                  disabled={loading}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={21}
                    color="#667085"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.loginButton,
                  loading && styles.disabledButton,
                ]}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>
                  Don't have an account?
                </Text>

                <TouchableOpacity
                  onPress={() => router.push('/signup')}
                  disabled={loading}
                >
                  <Text style={styles.signupLink}> Sign up</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.homeLink}
                onPress={() => router.replace('/')}
              >
                <Text style={styles.homeLinkText}>
                  Continue to home
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.footer}>
              Travel together. Go further.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
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
    width: 78,
    height: 78,
    borderRadius: 24,
    backgroundColor: '#E6F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 31,
    fontWeight: '800',
    color: '#172B4D',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#667085',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#344054',
    marginBottom: 9,
    marginTop: 12,
  },
  inputContainer: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#D8DEE8',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 14,
    fontSize: 15,
    color: '#172B4D',
  },
  loginButton: {
    minHeight: 54,
    backgroundColor: '#1769E0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 26,
  },
  disabledButton: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  signupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  signupText: {
    fontSize: 14,
    color: '#667085',
  },
  signupLink: {
    fontSize: 14,
    color: '#1769E0',
    fontWeight: '800',
  },
  homeLink: {
    alignItems: 'center',
    padding: 14,
    marginTop: 8,
  },
  homeLinkText: {
    color: '#667085',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    textAlign: 'center',
    marginTop: 30,
    color: '#98A2B3',
    fontSize: 13,
  },
});