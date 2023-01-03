import { Alert, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import React, {useState} from 'react';
import * as SQLite from 'expo-sqlite'

export default function TestTwoScreen({navigation}) {


  return (
    <View style={styles.container}>
          <TouchableOpacity style={styles.box} onPress={ () => navigation.navigate("test") }>
            <Text style={styles.boxText}>Go to next screen</Text>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center' 
  },
  box:{
    height: 80,
    width: "40%",
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    justifyContent: 'center',
  },

  holderBox: {
    backgroundColor: 'grey',
    width: '80%',
    height: '70%',
    borderRadius: 10,
    alignItems: 'center',
    bottom: 10,
  },
boxText:{
  color: 'white',
  fontSize: 15,
  textAlign: 'center',
  fontWeight: 'bold',
},

});
