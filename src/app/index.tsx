import React from 'react';
import { View, StyleSheet } from 'react-native';

import Header from '../Compo/Header';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});