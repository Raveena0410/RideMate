import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HowItWorks = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.heading}>How it works</Text>

      {/* Step 1 */}
      <View style={styles.step}>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>1</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Search for a ride</Text>
          <Text style={styles.description}>
            Enter your pickup and destination.
          </Text>
        </View>
      </View>

      {/* Step 2 */}
      <View style={styles.step}>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>2</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Choose your ride</Text>
          <Text style={styles.description}>
            Find a ride that suits your time and budget.
          </Text>
        </View>
      </View>

      {/* Step 3 */}
      <View style={styles.step}>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>3</Text>
        </View>

        <View style={styles.content}>
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
    marginHorizontal: 30,
    marginTop: 25,
    marginBottom: 30,
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 25,
  },

  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 25,
  },

  numberContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },

  number: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },

  content: {
    flex: 1,
    paddingTop: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 5,
  },

  description: {
    fontSize: 14,
    color: '#777',
    lineHeight: 20,
  },
});

export default HowItWorks;