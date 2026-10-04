import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.logo}>
        🚗 RideMate
      </Text>

      <Text style={styles.tagline}>
        Travel together. Save more.
      </Text>

      <View style={styles.links}>
        <Text style={styles.link}>About</Text>
        <Text style={styles.link}>Help</Text>
        <Text style={styles.link}>Contact</Text>
      </View>

      <Text style={styles.privacy}>
        Privacy Policy
      </Text>

      <Text style={styles.copyright}>
        © 2026 RideMate
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    alignItems: 'center',
  },

  logo: {
    fontSize: 20,
    fontWeight: '700',
  },

  tagline: {
    fontSize: 13,
    color: '#777',
    marginTop: 6,
  },

  links: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 25,
  },

  link: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },

  privacy: {
    fontSize: 12,
    color: '#777',
    marginTop: 12,
  },

  copyright: {
    fontSize: 11,
    color: '#999',
    marginTop: 15,
  },

});

export default Footer;