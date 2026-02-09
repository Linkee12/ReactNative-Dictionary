import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Collection from "./ui/Collection";
import { ScrollView } from "react-native-gesture-handler";
import AddCollectionModal from "./ui/addCollectionModal";

export default function HomeScreen() {
  const [example, setExample] = useState<string[]>([
    "almsadasd",
    "asdasd",
    "asdfas",
    "asdfggh",
    "asdfaf",
  ]);

  const [showAddCollection, setShowAddCollection] = useState<boolean>(false);

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

      <AddCollectionModal
        visible={showAddCollection}
        onClose={() => setShowAddCollection(false)}
        onAdd={(name) => {
          setExample((prev) => [...prev, name]);
        }}
      />

      <Pressable
        style={styles.addButton}
        onPress={() => setShowAddCollection(true)}
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
    height: 30,
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
    bottom: 40,
    right: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2e71bdff",
    borderRadius: 14,
  },

  addButtonText: {
    fontSize: 30,
    color: "white",
  },
});
