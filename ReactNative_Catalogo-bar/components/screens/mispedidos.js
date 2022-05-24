import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Card from '../card/card';
import firebase from "../../database/firebase";
import { getData } from '../../actions/auth';
import { roles } from "../../utils/rols";
import { useUsuario } from "../../context/userContext";

// async function getUserEmail() {
//     const user = await getData();
//     return user.email
// }

const MisPedidos = () => {

    const { user} = useUsuario();
    const [pedidos, setPedidos] = useState([]);
    //const [pedidosAdmin, setPedidosAdmin] = useState([]);
    //const [role, setRole] = useState(roles.Invitado);

    useEffect(() => {
               

        getPedidos()
       
    }, [])

    const getPedidos = async () => {
        firebase.db.collection("pedidos").onSnapshot((querySnapshot) => {
            const pedidos = [];
            querySnapshot.docs.forEach((doc) => {
                const { email, items, estado } = doc.data();
                if ((user.email === email && user.role == roles.Cliente) || (user.role == roles.Administrador)) {
                    pedidos.push({
                        id: doc.id,
                        email,
                        items,
                        estado
                    });
                }
            });
            setPedidos(pedidos);
        })
    }

    // const getPedidosAdmin = async () => {
    //     firebase.db.collection("pedidos").onSnapshot((querySnapshot) => {
    //         const pedidosAdmin = [];
    //         querySnapshot.docs.forEach((doc) => {
    //             const { email, items } = doc.data();
    //             pedidosAdmin.push({
    //                 id: doc.id,
    //                 email,
    //                 items,
    //             });
    //         });
    //         setPedidosAdmin(pedidosAdmin);
    //     })
    // }

    // if (role === "administrador") {
    //     getPedidosAdmin();
    // }
    // if (role === "cliente") {
    //     getPedidos();
    // }

    // if (role === "administrador") {
    //     return (
    //         <View style={styles.container}>
    //             <ScrollView>
    //                 {
    //                     pedidosAdmin.map((pedido, index) => (
    //                         <Card key={index} item={pedido} type={"pedido"} />
    //                     ))
    //                 }
    //             </ScrollView>
    //         </View>
    //     )
    // } else {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        pedidos.map((pedido, index) => (
                            <Card key={index} item={pedido} type={"pedido"} />
                        ))
                    }
                </ScrollView>
            </View>
        )
    //}
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

export default MisPedidos;
