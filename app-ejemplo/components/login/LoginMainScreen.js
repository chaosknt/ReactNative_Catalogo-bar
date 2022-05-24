import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, View, } from 'react-native';
import { getData, setNewUserinLocalDb, startLogout } from '../../actions/auth';
import { RegisterOrLoginScreen } from './RegisterOrLoginScreen.js';

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Components
import {Users} from "../../screens/Users";

const Stack = createStackNavigator();

const LoginMainScreen = () => {

  //const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    
  const [user, setUser] = useState('');
   
  if(!user){
    
    const r = getData()

    r.then( (us) => {
        
        if(!us){
          console.log('es null')
          const newUser = {
            email: '',
            firstTime: true
          }  
          setNewUserinLocalDb(newUser);
          setUser(newUser);
          handleFlagShowLoginWhenUserIsNullInFirstTime(true);
        }else{
          
          setUser(us)          
          handleFlagShowLoginWhenUserIsNullInFirstTime(us.firstTime)
        }
    })
        
  }

  const handleFlagShowLoginWhenUserIsNullInFirstTime = (value) => {

    setShowLogin(value)
  }

  const [showLogin, setShowLogin] = useState();  

  const handleShowLogin = ( value ) => {
    setShowLogin(value);
  }
  
  const handleLogout = async () => {        
    
    startLogout(user, setUser, setShowLogin);

  }  
  
  return (
    <View style={styles.container}>
     
     { showLogin && 

        <RegisterOrLoginScreen
        handleShowLogin = { handleShowLogin }
       />
     }
      
      { !showLogin && 

        <>
        <Button

          onPress ={handleLogout}
          title ={'Logout'}

          />

          <NavigationContainer>
            <Users />
         </NavigationContainer>
          </>
        
       
      }
       
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
  }
});

export default LoginMainScreen
