import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/FontAwesome";
import LoginMainScreen from "../login/LoginMainScreen";

const leftIcon = (navigation, icon) => (
    <Icon
      name= {icon}
      style= {{ marginLeft: 20}}
      size={20}
      color="#000"
      onPress={() => navigation.openDrawer()}  
    />
);

const LoginScreenStack = createStackNavigator({
    Home: {
        screen: LoginMainScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Inicio",
            headerLeft: () => leftIcon(navigation, "bars")
        })
    }
})


export default LoginScreenStack;