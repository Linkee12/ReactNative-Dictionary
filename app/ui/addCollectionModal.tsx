import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
};

export default function AddCollectionModal({ visible, onClose, onAdd }: Props) {
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd(name);
    setName("");
    onClose();
  };

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <LinearGradient colors={["#18191B", "#0E2845"]} style={styles.modal}>
          <Text style={styles.title}>New collection</Text>

          <TextInput
            placeholder="Collection name"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <View style={styles.actions}>
            <Pressable onPress={onClose} style={styles.cancel}>
              <Text style={styles.cancelText}>Discard</Text>
            </Pressable>

            <Pressable onPress={handleAdd} style={styles.add}>
              <Text style={styles.addText}>Add</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "85%",
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.1)",
  },

  title: {
    color: "white",
    fontSize: 22,
    marginBottom: 15,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#111113",
    color: "white",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    marginBottom: 20,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cancel: {
    padding: 12,
  },

  cancelText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
  },

  add: {
    backgroundColor: "#2e71bdff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },

  addText: {
    color: "white",
    fontSize: 16,
  },
});
