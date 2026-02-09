import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import migrateDbIfNeeded from "../schema/dbSchema";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SQLiteProvider databaseName="dictionary.db" onInit={migrateDbIfNeeded}>
        <StatusBar style="light" backgroundColor="#121212" />

        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: "#121212" },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}
