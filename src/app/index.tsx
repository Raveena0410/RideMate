import React from 'react';
import { View, StyleSheet } from 'react-native';

import Header from '../Compo/Header';
import Home from '../Screens/Home';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});