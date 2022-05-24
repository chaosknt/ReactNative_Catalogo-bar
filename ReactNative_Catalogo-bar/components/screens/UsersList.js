import React, { useState, useEffect } from "react";
import { Button, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { roles } from "../../utils/rols";
import firebase from "../../database/firebase";

const UserScreen = (props) => {
  const [users, setUsers] = useState([]);
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    firebase.db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.docs.forEach((doc) => {
        const documento = doc;
        const { email, role } = documento.data();
        users.push({
          id: documento.id,
          email,
          role,
        });
      });
      setUsers(users);
    });
    setCargando(false);
  }, []);

  const handleChangeRole = async (id, role, userEmail) => {
    const userRef = firebase.db.collection("users").doc(id);
    let newRole = role === roles.Cliente ? roles.Administrador : roles.Cliente
    await userRef.set({
      email: userEmail,
      role: newRole,
    });
  }

  return (
    <>
      {cargando &&
        <Text>Cargando...</Text>
      }

      <ScrollView>
        {users.map((user) => {
          return (
            <ListItem
              key={user.id}
              bottomDivider
            >
              <ListItem.Chevron />
              <ListItem.Content>
                <ListItem.Title>Email: {user.email}</ListItem.Title>
                <ListItem.Subtitle>Role: {user.role}</ListItem.Subtitle>
                {user.role === roles.Cliente &&
                  <Button title={'Hacer: Administrador'} onPress={() => {
                    handleChangeRole(user.id, user.role, user.email)
                  }
                  }></Button>
                }

                {user.role === roles.Administrador &&
                  <Button key={user.id} title={'Hacer: Cliente'} onPress={() => {
                    handleChangeRole(user.id, user.role, user.email)
                  }
                  } ></Button>
                }

              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>
    </>
  );
};

export default UserScreen;
