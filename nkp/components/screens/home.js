import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View,ScrollView,Button } from "react-native";
import firebase from "../../database/firebase.js";
import Card from '../card/card.js';
import ScrollViewProducto from "../scrollview/ScrollViewProducto"
import { agregarProductoAlCarrito } from './carrito.js';
//import productos from '../../utils/productos'

 export default HomeScreen = (props) => {
    const [productos, setProductos] = useState([]);
  
    useEffect(() => {
      const res =  getAllProducts();
  }, []);
  
  const getAllProducts = async () => {
      
    firebase.db.collection(firebase.producto).onSnapshot((querySnapshot) => {
      const prods = [];
      querySnapshot.docs.forEach((doc) => {
        const { descripcion, precio, codigo, habilitado, foto } = doc.data();
        //console.log(habilitado);
        if(habilitado){
            prods.push({
            id: doc.id,
            codigo,
            descripcion,
            precio,
            habilitado,
            foto
            });
        }
      });
      setProductos(prods)
    })
  }

    return (
        /*<View style={styles.container}>
            <Text style={styles.titulo}>Carta de Productos</Text>

            <ScrollViewProducto data={productos} />


            <StatusBar style="auto" />
        </View>*/

        <>
        <ScrollView>
        {
            productos.map((item, index) => (


                <Card key={index} producto={item} type={""} agregarProductoAlCarrito = {agregarProductoAlCarrito} />

            ))
        }
    </ScrollView>    

    </>
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