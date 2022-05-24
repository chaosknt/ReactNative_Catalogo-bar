import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/FontAwesome";
import ProductosScreen from "../screens/ProductosList";
import ProductoDetalleScreen from "../screens/ProductoDetalleScreen.js";
import CrearProductoScreen from "../screens/CrearProductoScreen.js";

const leftIcon = (navigation, icon) => (
    <Icon
      name= {icon}
      style= {{ marginLeft: 20}}
      size={20}
      color="#000"
      onPress={() => navigation.openDrawer()}  
    />
);

const ProductosScreenStack = createStackNavigator({
    ProductosList: {
        screen: ProductosScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Productos",
            headerLeft: () => leftIcon(navigation, "bars")
        })
    },
    DetalleProducto: {
        screen: ProductoDetalleScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Detalle de productos",
            headerLeft: () => leftIcon(navigation, "bars")
        })
    },
    CrearProducto: {
        screen: CrearProductoScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Alta de productos",
            headerLeft: () => leftIcon(navigation, "bars")
        })
    }    
})


export default ProductosScreenStack;