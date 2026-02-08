import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Collection from "../ui/Collection";
import { ScrollView } from "react-native-gesture-handler";

export default function DictionaryScreen() {
  const example = ["almsadasd", "asdasd", "asdfas", "asdfggh", "asdfaf"];

  return (
    <View style={styles.container}>
      <View style={styles.header} />

      <ScrollView
        style={styles.collectionContainer}
        contentContainerStyle={styles.collectionContent}
      >
        {example.map((value, idx) => (
          <Collection key={idx} id={idx} name={value} />
        ))}
      </ScrollView>

      <Pressable
        style={styles.addButton}
        onPress={() => {
          throw new Error("Function not implemented.");
        }}
      >
        <Text style={styles.addButtonText}>+</Text>
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

  collectionContainer: {
    flex: 1,
  },

  collectionContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 80,
  },

  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2e71bdff",
    borderRadius: 5,
  },

  addButtonText: {
    fontSize: 30,
    color: "white",
  },
});
