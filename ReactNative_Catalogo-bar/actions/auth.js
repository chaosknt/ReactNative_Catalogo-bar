import { firebase } from '../database/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-google-app-auth'
import { getUserByEmailFromFirebase } from './firebaseActions';
import { roles } from '../utils/rols';
import { useUsuario } from '../context/userContext';


export const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user', jsonValue)  
      
    } catch (e) {
      console.log(e)
    }
  }
  
export const getData = async () => {
    try {
        const r = JSON.parse( await AsyncStorage.getItem('user') )
      return r
      
    } catch(e) {
        console.log(e)
    }
  }
  
export const setNewUserinLocalDb = async ( newUser ) => {
    
   storeData(newUser);  
}

export const startLoginEmailPassword = async (userEmail, password, handleUpdateError,setUser, user) => {
   
    firebase.auth().signInWithEmailAndPassword( userEmail, password )
        .then( async() => {            
          
            await getUserByEmailFromFirebase(userEmail, setUser, user);
          
        })
        .catch( e => {
            console.log(e); 
            handleUpdateError(true)
        })
}

export const startGoogleLogin = async ( handleShowLogin, setUser, user ) => {
   
  const config = {
      iosClientId: `306602225596-c9oqr08t8q40tsiiogatjosv8asqo9ja.apps.googleusercontent.com`,
      androidClientId: `306602225596-j2b0mu7tb9j339f69qj6gjkbh0g5llg2.apps.googleusercontent.com`
  };

  const result = await Google.logInAsync(config);
  const { type, accessToken, user:usuario } = result
 
  if (type === 'success') {

      handleShowLogin(false);
      
      await getUserByEmailFromFirebase(usuario.email, setUser, user);
    
  }
}    

export const startRegisterWithEmailPasswordName = async (  newEmail, password, setUser, user ) => {
   
        firebase.auth().createUserWithEmailAndPassword( newEmail, password )
            .then( async() => {

                
                await getUserByEmailFromFirebase(newEmail, setUser, user);

            })
            .catch( e => {
                console.log(e);                
            })
    
}

export const startLogout = async ( user, setUser) => {
           
      await firebase.auth().signOut();
      await setUser({ ...user, email:'', isLogged:false, role:roles.Invitado })  
      await storeData(user);
       
     
    
}
   