import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, ScrollView } from "react-native";
import Card from '../card/card';
import { getData } from '../../actions/auth';
import firebase from "../../database/firebase";
import { estados } from '../../utils/estadosPedido';

let itemsAgregados = [];

async function getUserEmail() {
    const user = await getData();
    return user.email
}

export const agregarProductoAlCarrito = (p) => {
    itemsAgregados.push(p);
}

const Carrito = (props) => {
    const [totalPagar, setTotalPagar] = useState(0);
    const [pedidoNuevo, setPedidoNuevo] = useState({
        email: "",
        items: itemsAgregados,
        estado: estados.Pendiente
    })

    const { items } = pedidoNuevo

    getUserEmail().then((e) => {
        setPedidoNuevo({ ...pedidoNuevo, email: e })
    });

    const handlePedido = (k) => {
        const index = items.findIndex(e => e.id === k)
        if (index !== -1) {
            items.splice(index, 1)
            setPedidoNuevo({ ...pedidoNuevo, items: items })
        }
        totalPagarHandler();
    }

    const totalPagarHandler = () => {
        let total = 0;

        itemsAgregados.forEach(item => {
            let n = parseInt(item.precio)
            total = total + n;
        });
        setTotalPagar(total);
    }

    useEffect(() => {
        totalPagarHandler();
    }, [items.length])

    const handleTerminarPedido = async () => {
        if (items.length > 0) {
            try {
                await firebase.db.collection("pedidos").add(pedidoNuevo);
                props.navigation.navigate("MisPedidos");
            } catch (error) {
                console.log(error)
            } finally {
                itemsAgregados = [];
                setPedidoNuevo({ ...pedidoNuevo, items: itemsAgregados })
            }
        } else {
            props.navigation.navigate("Home");
        }
    }

    return (
        <>
            <ScrollView>
                {
                    itemsAgregados.map((item, index) => (
                        <Card key={index} item={item} type={"carrito"} handlePedido={handlePedido} />
                    ))
                }
            </ScrollView>
            <Text style={styles.precioTotal}>Total a pagar: ${totalPagar}</Text>
            <Button
                style={styles.custom}
                color="#CE1212"
                title="Pagar"
                onPress={handleTerminarPedido}
            />
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
    },
    precioTotal: {
        fontSize: 20,
        marginLeft: 2,
        fontWeight: "bold"
    },
    fila: {
        flexDirection: "row",
        marginTop: 8,
        marginBottom: 8
    },
    button: {
        position: "absolute",
        right: 0
    },
});

export default Carrito;
