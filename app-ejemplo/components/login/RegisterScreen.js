import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, } from 'react-native';
import { startRegisterWithEmailPasswordName } from '../../actions/auth.js';

const RegisterScreen = ( {handleShowLogin, handleShowRegister} ) => {

    const [userInput, setuserInput] = useState('');
    const [userPass, setuserPass] = useState('');
    const [userPassConfirm, setuserPassConfirm] = useState('');

    const handleEmail = (email) => {
        setuserInput(email);
      }
    
    const handlePass = (pass) => {
        setuserPass(pass)
      }
      
    const handleUserPassConfirm = (confirm) => {
        setuserPassConfirm(confirm)
    }
    const handleRegister = () => {

        if(userPass === userPassConfirm){
            
            startRegisterWithEmailPasswordName(handleShowLogin, userInput, userPass)

        }else{
            console.log("throw password");
        }
        
    }

    const Separator = () => (
        <View style={styles.separator} />
      );
    
    return (             

<>    
        <Text>Register</Text>
        
        <TextInput
            style={styles.input}
            onChangeText={handleEmail}
            value={userInput}
            placeholder="Email"
            keyboardType= "email-address"

        />
        <TextInput
            style={styles.input}
            onChangeText={handlePass}
            value={userPass}
            placeholder="Password"
            secureTextEntry={true}
        
        />

        <TextInput
            style={styles.input}
            onChangeText={handleUserPassConfirm}
            value={userPassConfirm}
            placeholder="Confirm password"
            secureTextEntry={true}
        
        />
           
    

    <Separator />

      
      <Button
        title="Registrarse"    
        onPress = { handleRegister }           
      />

      <Separator />

      <Text>Do you have an account? press <Text onPress={handleShowRegister} style={styles.acctext} >here</Text>  to sigin</Text>

</>
   
    )
}

const styles = StyleSheet.create({    
    input: {
      height: 40,
      width: 300,
      margin: 12,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10      
    },
      separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      acctext:{
         color:'#2196F3' 
      }
  });
  

export default RegisterScreen
