import { Alert, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestScreen from './screens/TestScreen';
import TestTwoScreen from './screens/TestTwoScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <View style={{ flex: 1,}}>
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false, 
          gestureEnabled: true,
        }} 
        mode="modal"
        initialRouteName="testTwo">
          {/* <Stack.Screen name="testTwo" component={ testTwoScreen } /> */}
          <Stack.Screen name="test" component={ TestScreen } />
          <Stack.Screen name="testTwo" component={ TestTwoScreen } />
        </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}