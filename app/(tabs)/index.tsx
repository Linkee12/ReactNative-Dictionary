import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import Collection from "../ui/Collection";
import { ScrollView } from "react-native-gesture-handler";

export default function DictionaryScreen() {
  const example = ["almsadasd", "asdasd", "asdfas", "asdfggh", "asdfaf"];
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <ScrollView>
        {
          example.map((value, idx) => <Collection key={idx} id={idx} name={value} />)

        } </ScrollView>
      <Pressable style={styles.addButton} onPress={() => { throw new Error("Function not implemented."); }}>
        <Text style={{ fontSize: 30 }}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111113",
    padding: 10,
  },


  header: {
    height: 100,
  },
  text: {
    color: "#FFA057",
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#2e71bdff",
    borderRadius: 5,
    fontSize: 10,
  }
});


