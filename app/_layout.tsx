import { Stack } from 'expo-router/stack';
import { SQLiteProvider } from 'expo-sqlite';
import migrateDbIfNeeded from './schema/dbSchema';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <SQLiteProvider databaseName="dictionary.db" onInit={migrateDbIfNeeded}>
      <StatusBar style="light" backgroundColor="#121212" />
      <Stack screenOptions={{
        contentStyle: {
          backgroundColor: '#121212',
        },
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider >
  );
}
