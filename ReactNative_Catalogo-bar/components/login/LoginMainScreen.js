import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getData, startLogout } from '../../actions/auth';
import { RegisterOrLoginScreen } from './RegisterOrLoginScreen.js';
import { useUsuario } from '../../context/userContext';
import { useEffect } from 'react';

const LoginMainScreen = () => {
  const { setUser, user } = useUsuario();
  const [showLogin, setShowLogin] = useState();

  useEffect(() => {
    async function getUserEmail() {
      await getData().then((e) => {
        if (e) {
          setShowLogin(e.isLogged);
        }
      });
    }
    getUserEmail();
  }, [user])

  const handleShowLogin = (value) => {
    setShowLogin(value);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {!showLogin &&
        <RegisterOrLoginScreen
          handleShowLogin={handleShowLogin}
        />
      }
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
  maintext: {
    fontWeight: 'bold',
    fontSize: 20,
  }
});

export default LoginMainScreen;
