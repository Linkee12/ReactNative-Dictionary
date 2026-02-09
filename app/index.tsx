import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AddCollectionModal from "./ui/addCollectionModal";
import { CollectionType, DbService } from "./services/dbService";
import Collection from "./ui/Collection";
import { useSQLiteContext } from "expo-sqlite";

export default function HomeScreen() {
  const db = useSQLiteContext();
  const dbService = new DbService(db);

  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [showAddCollection, setShowAddCollection] = useState<boolean>(false);

  const loadCollections = async () => {
    const result = await dbService.getCollections();
    setCollections(result);
  };

  useEffect(() => {
    loadCollections();
  }, []);

  const handleAddCollection = async (name: string) => {
    await dbService.addCollection(name);
    await loadCollections();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />

      <ScrollView
        style={styles.collectionContainer}
        contentContainerStyle={styles.collectionContent}
      >
        {collections.map((col) => (
          <Collection key={col.id} id={col.id} name={col.name} />
        ))}
      </ScrollView>

      <AddCollectionModal
        visible={showAddCollection}
        onClose={() => setShowAddCollection(false)}
        onAdd={handleAddCollection}
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
