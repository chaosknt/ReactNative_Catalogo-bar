import { firebase } from '../database/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-google-app-auth'

const storeData = async (value) => {
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

const getUserFromFirestore = ( email ) => {

}

const saveUserToFirestore = ( user ) => {

}

export const startLoginEmailPassword = async (handleShowLogin, userEmail, password) => {
   
    /*firebase.auth().signInWithEmailAndPassword( userEmail, password )
        .then( async() => {            

            handleShowLogin(false);

            const userLogged = {
                email: userEmail,
                firstTime: false
            }            
            storeData(userLogged)

        })
        .catch( e => {
            console.log(e);            
        })*/

        handleShowLogin(false);
       

}

export const startGoogleLogin = async ( handleShowLogin ) => {
   
    const config = {
        iosClientId: `306602225596-c9oqr08t8q40tsiiogatjosv8asqo9ja.apps.googleusercontent.com`,
        androidClientId: `306602225596-j2b0mu7tb9j339f69qj6gjkbh0g5llg2.apps.googleusercontent.com`
    };

    const result = await Google.logInAsync(config);
    const { type, accessToken, user } = result
   
    if (type === 'success') {

        handleShowLogin(false);
        const userLogged = {

            email: user.email,
            firstTime: false
        }
        await storeData(userLogged);
    }
}    

export const startRegisterWithEmailPasswordName = async ( handleShowLogin, newEmail, password ) => {
   
        firebase.auth().createUserWithEmailAndPassword( newEmail, password )
            .then( async() => {

                handleShowLogin(false);

                const userLogged = {
                    email: newEmail,
                    firstTime: false
                }
                
                storeData(userLogged);

            })
            .catch( e => {
                console.log(e);                
            })
    
}

export const startLogout = async ( user, setUser, setShowLogin  ) => {
           
    await firebase.auth().signOut().then( () => {

      setUser({ ...user, email:'', firstTime:true })         
      storeData(user);     
      setShowLogin(true);

    })    
}
   