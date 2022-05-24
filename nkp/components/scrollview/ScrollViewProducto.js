import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Card from '../card/card';
import firebase from "../../database/firebase.js";


const ScrollViewProducto = (({ data, tipo }) => (

    
    <ScrollView>
        {
            data.map((item, index) => (


                <Card key={index} producto={item} type={"agregar"}  />

            ))
        }
    </ScrollView>

))

const styles = StyleSheet.create({

})

export default ScrollViewProducto
