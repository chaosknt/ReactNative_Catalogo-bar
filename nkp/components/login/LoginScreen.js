import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';

const LoginScreen = ( {handleShowLogin, handleShowRegister } ) => {

    const [userInput, setuserInput] = useState('')
    const [userPass, setuserPass] = useState('')

    const [error, setError] = useState(false);

    
    const handleUpdateError = (value) => {
      setError(value)
    }
    const handleEmail = (email) => {
        setuserInput(email);
      }
    
      const handlePass = (pass) => {
        setuserPass(pass)
      }
  
    const handleLoginWithGoogle = async () => {
        
            startGoogleLogin(handleShowLogin)
    }

    const handleLoginWithEmailAndPassword = () => {
        startLoginEmailPassword(handleShowLogin, userInput, userPass, handleUpdateError )
    }

    const Separator = () => (
        <View style={styles.separator} />
      );
    
    return (             

<>    
        <Text >Sign in </Text>
        
        {error &&
          <Text style={styles.error}>Usuario y/o contraseña incorrectos </Text>
        }
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

            <Button

                title ={'Login'}
                style={styles.button}
                color="#1b1717"
                onPress ={ handleLoginWithEmailAndPassword }
            />

    

    <Separator />

      
      <Button
        title="Login with Google"    
        onPress = { handleLoginWithGoogle }           
      />

    <Separator />

     <Text>Need an account? press <Text onPress={handleShowRegister}  style={styles.acctext} >here</Text>  to register   
     </Text>

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
      },
      error: {
        color: 'red'
      }
  });
  

export default LoginScreen
