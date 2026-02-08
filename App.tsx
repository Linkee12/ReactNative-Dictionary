import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, UIManager, View } from "react-native";

export default function App() {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
