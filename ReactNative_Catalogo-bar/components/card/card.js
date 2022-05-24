import React from "react";
import { StyleSheet, View, Text, Image, Button, Alert } from "react-native";
import { producto } from "../../database/firebase";
import { estados } from "../../utils/estadosPedido";
import firebase from "../../database/firebase";
import { useUsuario } from "../../context/userContext";
import { roles } from "../../utils/rols";

const Card = ({ item, type, handlePedido, agregarProductoAlCarrito }) => {

    const { user } = useUsuario();
    const { role } = user;
    const handlep = () => {
        if (type === "carrito") {
            handlePedido(item.id)
        } else {
            agregarProductoAlCarrito(item);
            Alert.alert(
                'Producto agregado al carrito!'
            )
        }
    }

    var totalPagado = 0;
    
    const sumarPrecios = (precio) => {
        totalPagado = totalPagado + parseInt(precio);
    }
    
    const handleChangePedidoState = async (item) => {
        const pedidoRef = firebase.db.collection("pedidos").doc(item.id);
        const newPedidoState = item.estado === estados.Pendiente ? estados.Preparacion : estados.Finalizado
      
       await pedidoRef.set({
        id: item.id,
        email: item.email,
        items: item.items,
        estado: newPedidoState
      });

    }

    if (type === "pedido") {
        console.log(item)
       
        return (
            <View style={styles.card2}>
                <Text style={styles.titulo2}>Pedido de: {item.email}</Text>
                { item.estado == estados.Pendiente &&
                <Text style={styles.subtitulo2}>Estado:
                    <Text style={styles.estado}> {item.estado} </Text>  
                </Text>
                }
                { item.estado == estados.Preparacion &&
                <Text style={styles.subtitulo2}>Estado:
                    <Text style={styles.estadoPreparacion}> {item.estado} </Text>  
                </Text>
                }
                { item.estado == estados.Finalizado &&
                <Text style={styles.subtitulo2}>Estado:
                    <Text style={styles.estadoPendiente}> {item.estado} </Text>  
                </Text>
                }
                {role === roles.Administrador && item.estado !== estados.Finalizado &&
                    <View style={styles.fixToText}>
                         <Button color="#810000" title="Actualizar estado" onPress={() => { handleChangePedidoState(item) } } /> 
                    </View>  
                }
                    
                <Text style={styles.subtitulo2}>Items:</Text>
                    {item.items.map((producto, index) => (
                <Text key={index} style={styles.descripcion2} sumarPrecios= {sumarPrecios(producto.precio)}> • {producto.titulo} - ${producto.precio}</Text>
                    ))}  
                    <Text style={styles.subtitulo2}>Total: ${totalPagado}</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.card}>
                <View style={styles.fila}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: item.foto,
                        }}
                    />
                    <Text style={styles.titulo}>{item.titulo}{"\n"}
                        <Text style={styles.descripcion}>{item.descripcion}</Text>{"\n"}
                        <View style={styles.fila}>
                            <Text style={styles.precio}>${item.precio}</Text>
                        </View>
                    </Text>
                </View>
                <Button
                    style={styles.custom}
                    color="#CE1212"
                    title={type === "carrito" ? "Eliminar" : "Agregar"}
                    onPress={handlep}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 25,
        paddingLeft: 2,
        fontWeight: "bold"
    },
    titulo2: {
        fontSize: 15,
        paddingLeft: 2,
        fontWeight: "bold"
    },
    subtitulo: {
        fontSize: 18,
        paddingLeft: 2,
        fontWeight: "bold"
    },
    subtitulo2: {
        fontSize: 15,
        paddingLeft: 2,
        fontWeight: "bold"
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5,
        marginBottom: 5,
    },
    descripcion: {
        fontSize: 15,
        paddingLeft: 2,
        color: 'grey'
    },
    descripcion2: {
        fontSize: 15,
        paddingLeft: 2,
        color: 'white'
    },
    precio: {
        fontSize: 20,
        marginLeft: 2,
        fontWeight: "bold"
    },
    estado: {
        backgroundColor: 'green',
        color: 'white',
        fontWeight: "bold"
    },
    estadoPendiente: {
        backgroundColor: '#810000',
        color: 'white',
        fontWeight: "bold",
    },
    estadoPreparacion: {
        backgroundColor: 'orange',
        color: 'white',
        fontWeight: "bold",
    },
    botonEstado: {
        fontSize: 10
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
    card2: {
        borderBottomWidth: 1,
        borderColor: "grey",
        margin: 5,
        padding: 5,
        backgroundColor: "rgba(255, 0, 0, 0.7)",
        borderRadius: 5
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

export default Card;
