import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import NavigationCliente from "./components/navigation/NavigationCliente";
import { LogBox, Platform } from "react-native";
import { getData } from "./actions/auth";
import { roles } from "./utils/rols";
import LoginMainScreen from "./components/login/LoginMainScreen";
import { UserProvider, useUsuario } from "./context/userContext";
import NavigationAdmin from "./components/navigation/NavigationAdmin";

if (Platform.OS !== 'web') {
  LogBox.ignoreAllLogs()
}

export default () => <UserProvider>
  <App></App>
</UserProvider>

function App() {
  const { user } = useUsuario();
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [role, setRole] = useState(roles.Invitado);

  useEffect(() => {
    async function getUserEmail() {
      await getData().then((e) => {
        if (e) {
          setUserIsLogged(e.isLogged);
          setRole(e.role)
        }
      });
    }
    getUserEmail();
  }, [user])

  return (
    <>
      {!userIsLogged &&
        <LoginMainScreen />
      }

      {role === roles.Cliente &&
        <NavigationCliente>
          <StatusBar style="auto" />
        </NavigationCliente>
      }

      {role === roles.Administrador &&
        <NavigationAdmin>
          <StatusBar style="auto" />
        </NavigationAdmin>
      }
    </>
  );
};
