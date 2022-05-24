import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import Navigation from "./components/navigation/Navigation";
import {LogBox, Platform } from "react-native";
import { StyleSheet, Button } from "react-native";
import { getData, setNewUserinLocalDb } from "./actions/auth";
import { roles } from "./utils/rols";

if (Platform.OS !== 'web') {
  //console.ignoredYellowBox = ['Setting a timer'];
  //LogBox.ignoreLogs(['Setting a timer'])
  LogBox.ignoreAllLogs()
}


export default function App() {
  
const [user, setUser] = useState({
  email: '',
  firstTime: true, 
  role: roles.Invitado
})

const {firstTime, role } = user

useEffect( async () => {

   const storageUser = await getData();
    
   if(!storageUser){          
     
    setNewUserinLocalDb(user);   
   
  }else{
    
    setUser({...user, storageUser})          
    setNewUserinLocalDb(user);
  }
   
}, [role] )


  return (
    <>
     <Navigation >
      <StatusBar style="auto" />     
      </Navigation>
     
    </>
  );
};
