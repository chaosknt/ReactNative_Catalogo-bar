import React from 'react'
import { StyleSheet, Text, View } from "react-native";

export default function Productos () {
    return(
        <View style={styles.container}>
            <Text>Estamos en el ABM de Productos...</Text>
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