import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import Icon from "react-native-vector-icons/FontAwesome";

//ScreenStacks
import HomeScreenStack from "./HomeStack";
import MisPedidosScreenStack from "./MisPedidosStack";
import CarritoScreenStack from "./CarritoStack";
import PerfilScreenStack from "./PerfilStack";

const NavigationCliente = createDrawerNavigator(
    {
        Home: {
            screen: HomeScreenStack,
            navigationOptions: ({ tintColor }) => ({
                drawerLabel: "Inicio",
                drawerIcon: () => (
                    <Icon name="home" size={24} style={{ color: "#fff" }} />
                )
            })
        },
        Carrito: {
            screen: CarritoScreenStack,
            navigationOptions: ({ tintColor }) => ({
                drawerLabel: "Carrito",
                drawerIcon: () => (
                    <Icon name="shopping-cart" size={24} style={{ color: "#fff" }} />
                )
            })
        },
        MisPedidos: {
            screen: MisPedidosScreenStack,
            navigationOptions: ({ tintColor }) => ({
                drawerLabel: "Mis Pedidos",
                drawerIcon: () => (
                    <Icon name="list" size={24} style={{ color: "#fff" }} />
                )
            })
        },
        User: {
            screen: PerfilScreenStack,
            navigationOptions: ({ tintColor }) => ({
                drawerLabel: "Mi cuenta",
                drawerIcon: () => (
                    <Icon name="sign-out" size={24} style={{ color: "#fff" }} />
                )
            })
        }
    },
    {
        drawerBackgroundColor: "#717171",
        contentOptions: {
            activeTintColor: "#ff4375",
            inactiveTintColor: "#fff",
            itemsContainerStyles: {
                marginVertical: 0
            }
        }
    }
);

export default createAppContainer(NavigationCliente);
