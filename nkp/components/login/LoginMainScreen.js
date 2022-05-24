import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, View, Text} from 'react-native';
import { getData, setNewUserinLocalDb, startLogout } from '../../actions/auth';
import { roles } from '../../utils/rols';
import { RegisterOrLoginScreen } from './RegisterOrLoginScreen.js';

const LoginMainScreen = () => {
      
  const [user, setUser] = useState('');
 
  const Separator = () => (
    <View style={styles.separator} />
  );
   
   
  if(!user){
    
    const r = getData()

    r.then( (us) => {
        
        if(!us){          
          const newUser = {
            email: '',
            firstTime: true, 
            role: roles.Invitado
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
       <View  style={styles.container}>
         <Text  style={styles.bigBlue} >Bienvenido a MiMenu </Text>
         <Separator />        
         <Separator />
           <Button

            onPress ={handleLogout}
            title ={'Cerrar Sessión'}
          /> 
       </View>        
              
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
  },
  separator: {
    marginVertical: 8    
  },
  maintext: {
    fontWeight: 'bold',
    fontSize: 20,
  },bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default LoginMainScreen
