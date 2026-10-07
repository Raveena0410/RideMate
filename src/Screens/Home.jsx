import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import Header from '../Compo/Header';
import Card from '../Compo/Card';
import Pop from '../Compo/Popularroute';
import How from '../Compo/HowItWorks';
import Footer from '../Compo/Footer';
import Offer from '../Compo/offer-ride';


const Home = () => {
  return (
    <View style={styles.container}>

      <Header />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card />

        <Pop />

        <How />

        <Offer />

        <Footer/>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F7',
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 120,
  },
});

export default Home;