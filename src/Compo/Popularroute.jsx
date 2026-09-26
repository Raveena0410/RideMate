import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Popularroute = () => {
  return (
    <View style={styles.container}>

      {/* Heading */}
      <Text style={styles.heading}>Popular routes</Text>

      {/* Route 1 */}
      <View style={styles.routeCard}>
        <View>
          <Text style={styles.routeName}>Delhi → Jaipur</Text>
          <Text style={styles.routeDetails}>From ₹500 · 3h 30m</Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </View>

      {/* Route 2 */}
      <View style={styles.routeCard}>
        <View>
          <Text style={styles.routeName}>Delhi → Agra</Text>
          <Text style={styles.routeDetails}>From ₹300 · 3h</Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </View>

      {/* Route 3 */}
      <View style={styles.routeCard}>
        <View>
          <Text style={styles.routeName}>Delhi → Chandigarh</Text>
          <Text style={styles.routeDetails}>From ₹400 · 4h</Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  routeCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },

  routeName: {
    fontSize: 16,
    fontWeight: '600',
  },

  routeDetails: {
    fontSize: 13,
    color: '#777',
    marginTop: 5,
  },

  arrow: {
    fontSize: 28,
    color: '#777',
  },
});

export default Popularroute;