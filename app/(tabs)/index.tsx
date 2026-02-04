import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { LinearGradient } from "expo-linear-gradient";

export default function DictionaryScreen() {
  const db = useSQLiteContext();
  const example = ["almsadasd", "asdasd", "asdfas", "asdfggh", "asdfaf"];
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.collectionContainer}>
        {example.map((value, idx) => {
          const color = getColor(idx);
          return (
            <LinearGradient
              key={idx}
              colors={[color.bg[0], color.bg[1]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.collection}
            >
              <Text style={{ color: color.font }}>{value}</Text>
            </LinearGradient>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111113",
    padding: 10,
  },
  collection: {
    backgroundColor: "#333333",
    padding: 10,
    width: 150,
    height: 120,
    borderRadius: 15,
    margin: 10,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.1)",
  },
  collectionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  header: {
    height: 100,
  },
  text: {
    color: "#FFA057",
  },
});

function getColor(idx: number) {
  const colors = [
    { bg: ["#18191B", "#321E0C"], font: "#FFA057" },
    { bg: ["#18191B", "#132C21"], font: "#3BC984" },
    { bg: ["#18191B", "#36172E"], font: "#FF8DCC" },
    { bg: ["#18191B", "#0E2845"], font: "#70B8FF" },
  ];
  return colors[idx % 4];
}
