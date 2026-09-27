import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const Header = () => {
  return (
    <View style={styles.header}>

      {/* Logo */}
      <Text style={styles.header_text}>
        🚗 RideShare
      </Text>

      {/* Login + Signup */}
      <View style={styles.authContainer}>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.login}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={styles.signup}>
            Sign Up
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },

  header_text: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  authContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  login: {
    fontSize: 15,
    fontWeight: '600',
  },

  signup: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default Header;