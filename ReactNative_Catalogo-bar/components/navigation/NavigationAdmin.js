import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import Icon from "react-native-vector-icons/FontAwesome";

//ScreenStacks
import HomeScreenStack from "./HomeStack";
import ProductosScreenStack from "./ProductosStack";
import PerfilScreenStack from "./PerfilStack";
import UsersScreenStack from "./UsersStack";
import MisPedidosScreenStack from "./MisPedidosStack";

const NavigatonAdmin = createDrawerNavigator(
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
        Productos: {
            screen: ProductosScreenStack,
            navigationOptions: ({ tintColor }) => ({
                drawerLabel: "Productos",
                drawerIcon: () => (
                    <Icon name="check" size={24} style={{ color: "#fff" }} />
                )
            })
        },
        MisPedidos: {
            screen: MisPedidosScreenStack,
            navigationOptions: ({ tintColor }) => ({
                drawerLabel: "Pedidos",
                drawerIcon: () => (
                    <Icon name="list" size={24} style={{ color: "#fff" }} />
                )
            })
        },
        User: {
            screen: PerfilScreenStack,
            navigationOptions: ({ tintColor }) => ({
                drawerLabel: "Perfil",
                drawerIcon: () => (
                    <Icon name="sign-out" size={24} style={{ color: "#fff" }} />
                )
            })
        },
        UserAdmin: {
            screen: UsersScreenStack,
            navigationOptions: ({ tintColor }) => ({
                drawerLabel: "Usuarios",
                drawerIcon: () => (
                    <Icon name="user" size={24} style={{ color: "#fff" }} />
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

export default createAppContainer(NavigatonAdmin);
