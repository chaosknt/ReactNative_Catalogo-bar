import React, { useEffect, useState } from "react";
import joi from 'react-native-joi';
import * as ImagePicker from 'expo-image-picker';

import TextInputWithLabel from '../../components/Tags/TextInputWithLabel.js'

import {
  ScrollView,
  Button,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Text,
  CheckBox,
  Image,
  Platform,
} from "react-native";

import firebase from "../../database/firebase.js";

const ProductoDetalleScreen = (props) => {
  const initialState = {
    id: "",
    codigo:"",
    descripcion: "",
    titulo: "",
    precio: "",
    habilitado:false
  };

  const [producto, setProducto] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleChangeText = (value, prop) => {
    setProducto({ ...producto, [prop]: value });
  };

  const getProductoById = async (id) => {
    const dbRef = firebase.db.collection(firebase.producto).doc(id);
    const doc = await dbRef.get();
    const producto = doc.data();
    setProducto({ ...producto, id: doc.id, fotoAnt: producto.foto });
    setLoading(false);
  };

  const deleteProducto = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection(firebase.producto)
      .doc(producto.id);
    await dbRef.delete();
    const desertRef = firebase.st.ref().child(`images/${producto.id}`)
    const res = desertRef.delete()
    setLoading(false)
    props.navigation.navigate("ProductosList");
  };

  const openConfirmationAlert = () => {
    console.log('entro a confirmacion')
    Alert.alert(
      "Borrar producto",
      "Esta seguro?",
      [
        { text: "Si", onPress: () => deleteProducto() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateProducto = async () => {

    const schemaPost = joi.object({
      foto: joi.required(),
      fotoAnt: joi.required(),
      habilitado: joi.required(),
      codigo: joi.string().alphanum().min(3).max(8).required(),
      descripcion: joi.string().regex(new RegExp("^[0-9a-zA-ZñÑ,.-\\s]{1,30}$")).required(),
      titulo: joi.string().regex(new RegExp("^[0-9a-zA-ZñÑ,.-\\s]{1,30}$")).required(),
      precio: joi.number().min(1).required(),
      id: joi.required()
    });
    const result = schemaPost.validate(producto);
    if (result.error) {
      console.log(result.error.details[0].message)
      Alert.alert(result.error.details[0].message);
    } else {
      setLoading(true)
      if (producto.foto != producto.fotoAnt) {
          //console.log('1 ' + producto.foto)
          const img = await uploadImage(producto.foto)
          let ref = firebase.st.ref().child(`images/${producto.id}`)           
          await ref.put(img)
          let url = await ref.getDownloadURL()
          //console.log('url ' + url)
          producto.foto = url;
          //console.log('2 ' + producto.foto)
      }
      const productoRef = firebase.db.collection(firebase.producto).doc(producto.id);
      await productoRef.set({
        habilitado: producto.habilitado,
        codigo: producto.codigo,
        descripcion: producto.descripcion,
        titulo: producto.titulo,
        precio: producto.precio,
        foto: producto.foto,
      });
      setProducto(initialState);
      setLoading(false)
      props.navigation.navigate("ProductosList");
    }
  };

  useEffect(() => {
    getProductoById(props.navigation.state.params.productoId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

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

  return (
    <ScrollView style={styles.ppp}>
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
                />) }
              <Text style={styles.label}>Habilitado?</Text>
            </View>
          </View>

        <View style={styles.inputGroup}>
        {producto.foto && <Image source={{ uri: producto.foto }} style={{ width: 200, height: 200 }} />}
        <Button title="Seleccionar imagen de galeria" onPress={pickImage} />
        </View>

        </View>
        <View style={styles.btn}>
          <Button
            title="Delete"
            onPress={() => openConfirmationAlert()}
            color="#810000"
          />
        </View>

        <View style={styles.btn}>
          <Button 
            title="Update" 
            onPress={() => updateProducto()} 
            color="#810000" />
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
  ppp: {
    height: "auto",
  },
});

export default ProductoDetalleScreen;
