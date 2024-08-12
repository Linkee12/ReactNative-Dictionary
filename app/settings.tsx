import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Settings(){
    return (<View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:"pink"
    }}
  >
    <Link href="/">main</Link>
  </View>)
}