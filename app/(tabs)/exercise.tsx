import { Link } from "expo-router";
import React from "react";
import { View, StyleSheet} from "react-native";
import Button from "../ui/Button";

export default function AddWords(){
    return (
      <View style={style.container}>
        <View style={style.card}></View>
        <View style={style.menu}>
          <Button label={"Remove"}></Button>
        </View>
      </View>
    )
}

const style=StyleSheet.create({
  container:{
    backgroundColor:"#000",
    flexDirection:"column",
    flex:1,
  }
  ,
  card:{
    backgroundColor:"#517b7e",
    flex:1,
  },
  menu:{
    height:40,
  },
})