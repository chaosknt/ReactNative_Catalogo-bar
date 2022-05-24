import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
} from "react-native";


const TextInputWithLabel = ({label, campo, value,  Change, keyboard='default'}) => {
   
    return (
        <View>
        <Text>{label}</Text>
        <TextInput
          style={styles.inputStyle}
          value={value}
          keyboardType={keyboard}
          onChangeText={(value) => Change(value, campo)}
        />
        </View>
    )

}
const styles = StyleSheet.create({
    inputStyle: {
      marginTop: 7,
      width: 300,
      height: 40,
      paddingHorizontal: 10,
      backgroundColor: "#e6dad5",
    },
  });
export default TextInputWithLabel;