import React from 'react'
import { StyleSheet, Text, View } from "react-native";

export default function Perfil () {
    return(
        <View style={styles.container}>
            <Text>Estamos en el Perfil</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
})