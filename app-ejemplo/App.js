import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginMainScreen from './components/login/LoginMainScreen'

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Components
import {Users} from "./screens/Users";

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <View style={styles.container}>        
         <LoginMainScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
