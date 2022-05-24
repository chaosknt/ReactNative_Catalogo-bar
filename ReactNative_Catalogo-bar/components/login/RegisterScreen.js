import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, ImageBackground } from 'react-native';
import { startRegisterWithEmailPasswordName } from '../../actions/auth.js';
import { useUsuario } from '../../context/userContext.js';

const RegisterScreen = ( {handleShowLogin, handleShowRegister} ) => {

    const {setUser, user} = useUsuario();

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
            
           startRegisterWithEmailPasswordName( userInput, userPass, setUser, user)


        }else{
            console.log("throw password");
        }
        
    }

    const Separator = () => (
        <View style={styles.separator} />
      );
    
    return (             

<>    
<ImageBackground source={require('../../assets/fondo.jpg')} style={styles.backgroundImage}></ImageBackground>
        <Text style={styles.titulo}>Registrate</Text>
        
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
            placeholder="Contraseña"
            secureTextEntry={true}
        
        />

        <TextInput
            style={styles.input}
            onChangeText={handleUserPassConfirm}
            value={userPassConfirm}
            placeholder="Confirmar contraseña"
            secureTextEntry={true}
        
        />
           
    

    <Separator />

      
      <Button
        title="Registrarse"    
        onPress = { handleRegister }           
      />

      <Separator />

      <Text>Ya tenes una cuenta? Inicia sesión <Text onPress={handleShowRegister} style={styles.acctext} >aquí</Text></Text>

</>
   
    )
}

const styles = StyleSheet.create({ 
    backgroundImage: {
      flex: 1,
      width: "100%",
      height: "100%",
      position: 'absolute',
      justifyContent: "center",
      alignItems: "center",
      resizeMode: 'cover',
      backgroundColor:'transparent',
      justifyContent: 'flex-start',
    },
    titulo:{
      fontSize:20,
    },     
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
