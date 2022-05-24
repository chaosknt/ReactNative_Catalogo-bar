import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, ImageBackground } from 'react-native';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useUsuario } from '../../context/userContext';

const LoginScreen = ( {handleShowLogin, handleShowRegister } ) => {

    const {setUser, user } = useUsuario();

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
        
            startGoogleLogin(handleShowLogin, setUser, user)
    }

    const handleLoginWithEmailAndPassword = async () => {
        await startLoginEmailPassword(userInput, userPass, handleUpdateError,setUser,user)
    }

    const Separator = () => (
        <View style={styles.separator} />
      );
    
    return (             

<>    
        <ImageBackground source={require('../../assets/fondo.jpg')} style={styles.backgroundImage}></ImageBackground>
        <Text style={styles.titulo}>Iniciar Sesión</Text>
        
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
            placeholder="Contraseña"
            secureTextEntry={true}
        
        />

            <Button

                title ={'Ingresar'}
                style={styles.button}
                color="#CE1212"
                onPress ={ handleLoginWithEmailAndPassword }
            />

    

    <Separator />

      
      <Button
        title="Iniciar con Google"    
        onPress = { handleLoginWithGoogle }           
      />

    <Separator />

     <Text>No tenes una cuenta? Registrate <Text onPress={handleShowRegister}  style={styles.acctext} >aquí</Text> 
     </Text>

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
      },
      error: {
        color: 'red'
      }
  });
  

export default LoginScreen
