import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/FontAwesome";
import ProductosScreen from "../screens/ProductosList";
import ProductoDetalleScreen from "../screens/ProductoDetalleScreen.js";
import UserScreen from "../screens/UsersList";
import UserDetailScreen from "../screens/UserDetailScreen";

const leftIcon = (navigation, icon) => (
    <Icon
      name= {icon}
      style= {{ marginLeft: 20}}
      size={20}
      color="#000"
      onPress={() => navigation.openDrawer()}  
    />
);

const UsersScreenStack = createStackNavigator({
    UserList: {
        screen: UserScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Usuarios",
            headerLeft: () => leftIcon(navigation, "bars")
        })
    },
    UserDetail: {
        screen: UserDetailScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Detalle de usuarios",
            headerLeft: () => leftIcon(navigation, "bars")
        })
    }
})


export default UsersScreenStack;