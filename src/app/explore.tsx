import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function ExploreScreen() {
  const { from, to, date, passengers } = useLocalSearchParams<{
    from?: string;
    to?: string;
    date?: string;
    passengers?: string;
  }>();

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>RIDE SEARCH</Text>
        <Text style={styles.title}>Your trip</Text>

        <View style={styles.routeRow}>
          <View style={styles.routeMark}>
            <View style={styles.startDot} />
            <View style={styles.routeLine} />
            <View style={styles.endDot} />
          </View>
          <View style={styles.routeLabels}>
            <Text style={styles.location}>{from || 'Starting point'}</Text>
            <Text style={styles.location}>{to || 'Destination'}</Text>
          </View>
        </View>

        <View style={styles.details}>
          <Text style={styles.detail}>{date || 'Date not selected'}</Text>
          <Text style={styles.detail}>{passengers || '1'} {passengers === '1' || !passengers ? 'passenger' : 'passengers'}</Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.messageTitle}>Ride listings will appear here</Text>
          <Text style={styles.message}>
            Search is connected to this screen. Live ride results will show once ride search is connected to the backend.
          </Text>
        </View>

        <Pressable style={styles.button} onPress={() => router.replace('/')}>
          <Text style={styles.buttonText}>Back to search</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7F9FC',
  },
  card: {
    width: '100%',
    maxWidth: 520,
    padding: 24,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E6EF',
  },
  eyebrow: {
    color: '#1769E0',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: '#172B4D',
    fontSize: 27,
    fontWeight: '700',
    marginTop: 6,
    marginBottom: 22,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#E1E6EF',
    borderRadius: 12,
  },
  routeMark: {
    alignItems: 'center',
    marginRight: 14,
  },
  startDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#1769E0',
  },
  routeLine: {
    height: 24,
    borderLeftWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#98A2B3',
  },
  endDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: '#1769E0',
  },
  routeLabels: {
    flex: 1,
    gap: 20,
  },
  location: {
    color: '#172B4D',
    fontSize: 15,
    fontWeight: '600',
  },
  details: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  detail: {
    color: '#475467',
    fontSize: 13,
    backgroundColor: '#F2F4F7',
    paddingVertical: 8,
    paddingHorizontal: 11,
    borderRadius: 16,
  },
  messageBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
  },
  messageTitle: {
    color: '#172B4D',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  message: {
    color: '#667085',
    fontSize: 13,
    lineHeight: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    marginTop: 18,
    borderRadius: 10,
    backgroundColor: '#1769E0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
