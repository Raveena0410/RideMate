import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HowItWorks = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.heading}>How it works</Text>

      <View style={styles.step}>
        <Text style={styles.number}>1</Text>

        <View>
          <Text style={styles.title}>Search for a ride</Text>
          <Text style={styles.description}>
            Enter your pickup and destination.
          </Text>
        </View>
      </View>

      <View style={styles.step}>
        <Text style={styles.number}>2</Text>

        <View>
          <Text style={styles.title}>Choose your ride</Text>
          <Text style={styles.description}>
            Find a ride that suits your time and budget.
          </Text>
        </View>
      </View>

      <View style={styles.step}>
        <Text style={styles.number}>3</Text>

        <View>
          <Text style={styles.title}>Book your seat</Text>
          <Text style={styles.description}>
            Confirm your booking and enjoy the journey.
          </Text>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    marginBottom: 30,
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  number: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#000',
    color: '#fff',
    textAlign: 'center',
    paddingTop: 8,
    fontWeight: 'bold',
    marginRight: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
  },

  description: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },
});

export default HowItWorks;