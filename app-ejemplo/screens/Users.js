import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet,Button } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Components
import CreateUserScreen from "./CreateUserScreen";
import UserDetailScreen from "./UserDetailScreen";
import UsersList from "./UsersList";


const Stack = createStackNavigator();

export function Users() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#621FF7",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
       
      <Stack.Screen
        name="UsersList"
        component={UsersList}
        options={{ title: "Users List"} }
      />     
      
      <Stack.Screen
        name="CreateUserScreen"
        component={CreateUserScreen}
        options={{ title: "Create a New User" }}
      />
      <Stack.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{ title: "User Detail" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Users />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
