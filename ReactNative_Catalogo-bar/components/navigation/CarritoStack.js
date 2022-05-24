import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/FontAwesome";
import CarritoScreen from "../screens/carrito";

const leftIcon = (navigation, icon) => (
    <Icon
      name= {icon}
      style= {{ marginLeft: 20}}
      size={20}
      color="#000"
      onPress={() => navigation.openDrawer()}  
    />
);

const CarritoScreenStack = createStackNavigator({
    Carrito: {
        screen: CarritoScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Carrito",
            headerLeft: () => leftIcon(navigation, "bars")
        })
    }
})


export default CarritoScreenStack;