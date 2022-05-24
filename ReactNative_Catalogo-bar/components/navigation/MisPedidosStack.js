import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/FontAwesome";
import MisPedidosScreen from "../screens/mispedidos";

const leftIcon = (navigation, icon) => (
    <Icon
        name={icon}
        style={{ marginLeft: 20 }}
        size={20}
        color="#000"
        onPress={() => navigation.openDrawer()}
    />
);

const MisPedidosScreenStack = createStackNavigator({
    MisPedidos: {
        screen: MisPedidosScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Mis Pedidos",
            headerLeft: () => leftIcon(navigation, "bars")
        })
    }
})


export default MisPedidosScreenStack;