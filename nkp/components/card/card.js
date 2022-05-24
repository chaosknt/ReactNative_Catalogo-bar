import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, Button } from "react-native";
import firebase from "../../database/firebase";

// Esta funcion va en el onPress del boton y se le pasa la prop type.
const buttonOnPressHandler = (type) => {
    if (type === "carrito") {
        () => {
            //Eliminar
        }
    }
    // Agregar
    /* await firebase.db.collection("pedidos").add({
        pedido: {
            productos: [],
            idUsuario: '',
            estado: 'pendiente',

        }
    }) */
}

const Card = ({ producto, type, handlePedido, agregarProductoAlCarrito}) => {
    const [cant, setCant] = useState("1");
    
    const handlep = () =>{
       if(type === "carrito"){
        handlePedido(producto.id)
       }else{          
           agregarProductoAlCarrito(producto);
       }
        
    }
    return (

        <View style={styles.card}>
            <View style={styles.fila}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: producto.foto,
                    }}
                />
                <Text style={styles.titulo}>Titulo{/*{producto.nombre}*/}{"\n"}
                    <Text style={styles.descripcion}>{producto.descripcion}</Text>{"\n"}
                    <View style={styles.fila}>
                        <Text style={styles.precio}>${producto.precio}</Text>
                        {type !== "pedidos" &&
                            <TextInput style={styles.input} onChangeText={setCant} value={cant} keyboardType='numeric' />
                            //En caso contrario mostrar estado del pedido.
                        }
                    </View>
                </Text>
            </View>
            {type !== "pedidos" &&
                <Button
                    style={styles.custom}
                    color="#CE1212"
                    title={type === "carrito" ? "Eliminar" : "Agregar"}
                    onPress={handlep}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 25,
        paddingLeft: 2,
        fontWeight: "bold"
    },
    descripcion: {
        fontSize: 15,
        paddingLeft: 2,
        color: 'gray'
    },
    precio: {
        fontSize: 20,
        marginLeft: 2,
        fontWeight: "bold"
    },
    input: {
        borderWidth: 1,
        width: "10%",
        borderColor: "#000",
        textAlign: "center",
        fontSize: 18,
        borderRadius: 5,
        marginLeft: 8,
        fontWeight: "bold"
    },
    fila: {
        flexDirection: "row",
        marginTop: 8,
        marginBottom: 8
    },
    card: {
        borderBottomWidth: 0.1,
        borderColor: "grey",
        margin: 5,
        paddingBottom: 1
    },
    custom: {
        marginLeft: "5"
    },
    tinyLogo: {
        width: 100,
        height: 100,
        borderRadius: 5
    },
})

export default Card
