import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Platform } from "react-native";
import Button from "../Button";

export default function AddWords() {
  const [engText, onChangeEngText] = React.useState('');
  const [hunText, onChangeHunText] = React.useState('');
  return (<View
    style={styles.container}>

    <SafeAreaView>
      <Text style={styles.text}>Add words</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEngText}
        value={engText}
        autoCapitalize="sentences"
        placeholder="English"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeHunText}
        value={hunText}
        autoCapitalize="sentences"
        placeholder="Hungary"
      />
      <View style={styles.buttonContainer}>
        <Button label={"Translate"} />
        <Button label={"Get example"} />
      </View>
    </SafeAreaView>

  </View>)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "black",
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: "white",
    margin: 4,
    backgroundColor: "rgb(32,35,42)"
  },
  text: {
    fontWeight: 700,
    fontSize: 36,
    textAlign: "center",
    padding: 16,
    color: "#517b7e",
    fontFamily: Platform.select({
      android: 'Inter_900Black',
      ios: 'Inter-Black'
    })
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row"
  }
})