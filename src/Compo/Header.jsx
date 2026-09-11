import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
        <Text style={styles.header_text}>🚗 RideShare</Text>
        <Text style={styles.profile}>  👤</Text>

    </View>
  )
}
const styles=StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:20,
        backgroundColor:'white',



    },
    header_text:{
        fontsize:20,

    },
    profile:{
        fontsize:10,
    }


})

export default Header