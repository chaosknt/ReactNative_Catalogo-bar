import React from 'react';
import { Button, StyleSheet, Text, View, ImageBackground } from "react-native";
import { useUsuario } from '../../context/userContext';
import { startLogout } from '../../actions/auth';

const PerfilScreen = () => {
    const { setUser, user } = useUsuario();
    

    const handleLogout = async () => {
        await startLogout(user, setUser);
    }
    console.log(user)

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/fondo.jpg')} style={styles.backgroundImage}></ImageBackground>
            <Text style={styles.perfilTitle}>Bienvenid@</Text>
            <Text style={styles.perfilEmail}>{user.email}</Text>
            <Button onPress={handleLogout} title={'Cerrar Sessión'}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    perfilTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        marginVertical: 5,
    },
    perfilEmail: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 16,
    },
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
})

export default PerfilScreen;
