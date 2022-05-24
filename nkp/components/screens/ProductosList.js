import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import TextWithLabel from "../../components/Tags/TextWithLabel.js"
import firebase from "../../database/firebase.js";
import { NavigationActions } from 'react-navigation';

const ProductoScreen = (props) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const res =  getAllProducts();
}, []);

const getAllProducts = async () => {
    
  firebase.db.collection(firebase.producto).onSnapshot((querySnapshot) => {
    const prods = [];
    querySnapshot.docs.forEach((doc) => {
      const { descripcion, precio, codigo, habilitado, foto, titulo } = doc.data();
      //console.log('foto ' + foto)
      prods.push({
        id: doc.id,
        codigo,
        descripcion,
        precio,
        habilitado,
        foto,
        titulo
      });
    });
    setProductos(prods)
  })
}



  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CrearProducto")}
        title="Crear producto"
        color="#810000"
      />

      {productos.map((producto) => {
        return (
          <ListItem
            key={producto.id}
            bottomDivider
            onPress={() => 
              {
                props.navigation.navigate('DetalleProducto',{productoId: producto.id})
              }
            }
          >
            <ListItem.Chevron />
            <Avatar
              size="large"
              source={{uri:producto.foto,}}
            />
            <ListItem.Content>
            <ListItem.Title>{TextWithLabel({label:'Codigo:      ', text:producto.codigo })}</ListItem.Title>
            <ListItem.Subtitle>{TextWithLabel({label:'Titulo:  ', text:producto.titulo })}</ListItem.Subtitle>
            <ListItem.Subtitle>{TextWithLabel({label:'Descripcion:  ', text:producto.descripcion })}</ListItem.Subtitle>
            <ListItem.Subtitle>{TextWithLabel({label:'Precio:           ', text:'$' + producto.precio })}</ListItem.Subtitle>
            <ListItem.Subtitle>{TextWithLabel({label:'Habilitado:    ', text:(producto.habilitado)?'si':'no' })}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default ProductoScreen;
