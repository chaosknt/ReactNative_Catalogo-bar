import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
} from "react-native";


const TextWithLabel = ({label, text}) => {

    return (
        <View style={styles.inputStyle}>
        <Text >{label}</Text>
        <Text >{text}</Text>
        </View>
    )

}
const styles = StyleSheet.create({
    inputStyle: {
      flex: 1,
      flexDirection:'row',
    //   width: 200,
    //   height: 40,
    },
  });
export default TextWithLabel;