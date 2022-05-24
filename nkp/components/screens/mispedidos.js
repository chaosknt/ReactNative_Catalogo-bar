import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";

import ScrollViewProducto from "../scrollview/ScrollViewProducto";
// Falta traer la coleccion de pedidos de Firebase.
import pedidos from "../../utils/pedidos";

import firebase from "../../database/firebase";




export default function MisPedidos() {
         
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Mis pedidos</Text>

            <ScrollViewProducto data={pedidos} tipo="pedidos" />

            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    titulo: {
        fontSize: 25,
        textAlign: "center",
        fontWeight: "600"
    }
})