import React from "react";
import { Button } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Components
import CreateUserScreen from "./CreateUserScreen";
import UserDetailScreen from "./UserDetailScreen";
import UsersList from "./UsersList";
import LoginMainScreen from "../login/LoginMainScreen"

const Stack = createStackNavigator();

export function Users() {
  return (
    <>
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
          name="Login"
          component={LoginMainScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="UsersList"
          component={UsersList}
          options={{
            title: "Users List", headerRight: () => (
              <Button title="Logout" />
            )
          }}
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
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Users />
    </NavigationContainer>
  );
}