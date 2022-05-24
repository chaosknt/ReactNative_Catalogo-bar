import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/FontAwesome";
import PerfilScreen from "../screens/perfil";

const leftIcon = (navigation, icon) => (
    <Icon
      name= {icon}
      style= {{ marginLeft: 20}}
      size={20}
      color="#000"
      onPress={() => navigation.openDrawer()}  
    />
);

const PerfilScreenStack = createStackNavigator({
    Perfil: {
        screen: PerfilScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Perfil",
            headerLeft: () => leftIcon(navigation, "bars")
        })
    }
})


export default PerfilScreenStack;