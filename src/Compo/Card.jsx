import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Card = () => {
  return (
    <View style={styles.card}>

      {/* Card Heading */}
      <Text style={styles.title}>Find a ride</Text>

      {/* From Location */}
      <View style={styles.locationRow}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>●</Text>
        </View>

        <View>
          <Text style={styles.label}>Leaving from</Text>
          <Text style={styles.placeholder}>Enter pickup location</Text>
        </View>
      </View>

      {/* Line between locations */}
      <View style={styles.line} />

      {/* To Location */}
      <View style={styles.locationRow}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>●</Text>
        </View>

        <View>
          <Text style={styles.label}>Going to</Text>
          <Text style={styles.placeholder}>Enter destination</Text>
        </View>
      </View>

      {/* Date and Passengers */}
      <View style={styles.detailsRow}>

        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Date</Text>
          <Text style={styles.detailValue}>Today</Text>
        </View>

        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Passengers</Text>
          <Text style={styles.detailValue}>1 passenger</Text>
        </View>

      </View>

      {/* Search Button */}
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchText}>Search rides</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({

  card: {
    margin: 16,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,

    // Shadow for Android
    elevation: 5,

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 30,
    alignItems: 'center',
    marginRight: 10,
  },

  icon: {
    fontSize: 14,
  },

  label: {
    fontSize: 13,
    color: '#777',
  },

  placeholder: {
    fontSize: 16,
    marginTop: 4,
    color: '#333',
  },

  line: {
    height: 30,
    width: 1,
    backgroundColor: '#ccc',
    marginLeft: 14,
  },

  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },

  detailBox: {
    width: '48%',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },

  detailLabel: {
    fontSize: 13,
    color: '#777',
  },

  detailValue: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 5,
  },

  searchButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#000',
  },

  searchText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default Card;