import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/FontAwesome";

import CrearProductosScreen from "../screens/CrearProductoScreen.js";

const leftIcon = (navigation, icon) => (
    <Icon
      name= {icon}
      style= {{ marginLeft: 20}}
      size={20}
      color="#000"
      onPress={() => navigation.openDrawer()}  
    />
);

const CrearProductosScreenStack = createStackNavigator({
    CrearProductos: {
        screen: CrearProductosScreen,
        navigationOptions: ({ navigation}) => ({
            title: "Alta de productos",
            headerLeft: () => leftIcon(navigation, "bars")
        })
    }
})


export default CrearProductosScreenStack;