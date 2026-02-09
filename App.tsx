import { StatusBar } from "expo-status-bar";
import { UIManager, Platform } from "react-native";

export default function App() {
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
  }

  return (
    <>
      <StatusBar style="light" />
    </>
  );
}
