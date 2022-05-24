import React, { useState, useEffect } from "react";
import joi from 'react-native-joi';
import * as ImagePicker from 'expo-image-picker';

import TextInputWithLabel from '../../components/Tags/TextInputWithLabel.js'
import {
  Button,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  CheckBox,
  Text,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";

import firebase from "../../database/firebase.js";


const CrearProductoScreen = (props) => {

  const initalState = {
    descripcion: "",
    titulo: "",
    precio: "",
    codigo:"",
    habilitado:true,
    foto: undefined
  };

  const [producto, setProducto] = useState(initalState);
  const [loading, setLoading] = useState(false);

  const handleChangeText = (value, name) => {
    //validar el campo
    setProducto({ ...producto, [name]: value });
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          console.log('Lo sentimos, necesita permisos para acceder a las fotos')
          Alert.alert('Lo sentimos, necesita permisos para acceder a las fotos');
        }
      }
    })();
  }, []);

  const saveNewProducto = async () => {
    const schemaPost = joi.object({
      habilitado: joi.required(),
      foto: joi.required(),
      codigo: joi.string().alphanum().min(3).max(8).required(),
      descripcion: joi.string().regex(new RegExp("^[0-9a-zA-ZñÑ,.-\\s]{1,30}$")).required(),
      titulo: joi.string().regex(new RegExp("^[0-9a-zA-ZñÑ,.-\\s]{1,30}$")).required(),
      precio: joi.number().min(1).required(),
    });

    const result = schemaPost.validate(producto);
    if (result.error) {
      console.log(result.error.details[0].message)
      Alert.alert(result.error.details[0].message);
    } else {
      try {

        setLoading(true);
        const prod = await firebase.db.collection(firebase.producto).add({
                               codigo: producto.codigo,
                               descripcion: producto.descripcion,
                               titulo: producto.titulo,
                               precio: producto.precio,
                               habilitado: producto.habilitado
                               })
        producto.id = prod.id
        console.log(producto.id)
        prod.foto = producto.foto

        const img = await uploadImage(prod.foto)
        let ref = firebase.st.ref().child(`images/${producto.id}`)           
        await ref.put(img)
        let url = await ref.getDownloadURL()
        console.log('url ' + url)
        producto.foto = url;
        const productoRef = firebase.db.collection(firebase.producto).doc(producto.id);
        const res = await productoRef.set({
                          habilitado: producto.habilitado,
                          codigo: producto.codigo,
                          descripcion: producto.descripcion,
                          titulo: producto.titulo,
                          precio: producto.precio,
                          foto: producto.foto,
        });
        setLoading(false);
        props.navigation.navigate("ProductosList");

       } catch (error) {
         console.log(error)
         Alert.alert('error', error)
         }
      }
    };

  const uploadImage = uri => {
    console.log('uploadImage')
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };
      xhr.open("GET", uri);
      xhr.responseType = "blob";
      xhr.send();
    });
  };

  const pickImage = async () => {
    console.log('pickImage')
    let resultImagePicker = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!resultImagePicker.cancelled) {
      const img = resultImagePicker.uri
      //console.log('setImage en pickImage ' + resultImagePicker.uri)
      handleChangeText(img, 'foto');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView >
      <View style={styles.container}>

        <View style={styles.inputGroup}>
          {TextInputWithLabel (
            {label: 'Codigo',
            campo: 'codigo',
            value: producto.codigo,
            Change: handleChangeText})
          }
        </View>

        <View style={styles.inputGroup}>
          {TextInputWithLabel (
            {label: 'Descripcion',
            campo: 'descripcion',
            value: producto.descripcion,
            Change: handleChangeText})
          }
        </View>

        <View style={styles.inputGroup}>
          {TextInputWithLabel (
            {label: 'Titulo',
            campo: 'titulo',
            value: producto.titulo,
            Change: handleChangeText})
          }
        </View>
        <View style={styles.inputGroup}>
          {TextInputWithLabel (
            {label: 'Precio',
            campo: 'precio',
            value: producto.precio,
            Change: handleChangeText,
            keyboard:'numeric'})
          }
        </View>

        <View style={styles.container}>
          <View style={styles.checkboxContainer}>
          {Platform.OS === "ios" ? (
            <Switch
              value={producto.habilitado}
              onValueChange={value => {
                handleChangeText(value, "habilitado")} }
              style={styles.checkbox}
            />) :
            (
              <CheckBox
                value={producto.habilitado}
                onValueChange={value => {
                  handleChangeText(value, "habilitado")} }
                style={styles.checkbox}
              />)}
            <Text style={styles.label}>Habilitado?</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
        {producto.foto && <Image source={{ uri: producto.foto }} style={{ width: 200, height: 200 }} />}
        <Button title="Seleccionar imagen de galeria" onPress={pickImage} />
        </View>

        <View style={styles.btn}>
          <Button title="Guardar" onPress={() => saveNewProducto()} color="#810000"/>
        </View>

        <View style={styles.btn}>
          <Button title="Cancelar" onPress={() => props.navigation.navigate("ProductosList")} color="#810000"/>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    height: "auto"
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 7,
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  btn: {
    marginTop: 7,
    marginBottom: 7,
  },
});

export default CrearProductoScreen;
