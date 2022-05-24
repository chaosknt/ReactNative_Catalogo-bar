import React, { useState, useEffect } from 'react'
import { ScrollView } from "react-native";
import firebase from "../../database/firebase.js";
import Card from '../card/card.js';
import { agregarProductoAlCarrito } from './carrito.js';

const HomeScreen = (props) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const res = getAllProducts();
  }, []);

  const getAllProducts = async () => {

    firebase.db.collection(firebase.producto).onSnapshot((querySnapshot) => {
      const prods = [];
      querySnapshot.docs.forEach((doc) => {
        const { titulo, descripcion, precio, codigo, habilitado, foto } = doc.data();
        if (habilitado) {
          prods.push({
            id: doc.id,
            codigo,
            titulo,
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
    <>
      <ScrollView>
        {
          productos.map((item, index) => (
            <Card key={index} item={item} agregarProductoAlCarrito={agregarProductoAlCarrito} />
          ))
        }
      </ScrollView>
    </>
  )
}

export default HomeScreen;
