import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/FontAwesome";
import ProductoDetalleScreen from "../screens/ProductoDetalleScreen.js";

const leftIcon = (navigation, icon) => (
    <Icon
      name= {icon}
      style= {{ marginLeft: 20}}
      size={20}
      color="#000"
      onPress={() => navigation.openDrawer()}  
    />
);

const DetalleProductoScreenStack = createStackNavigator({
    DetalleProducto: {
        screen: ProductoDetalleScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Detalle de productos",
            headerLeft: () => leftIcon(navigation, "bars")
        })
    }
})


export default DetalleProductoScreenStack;