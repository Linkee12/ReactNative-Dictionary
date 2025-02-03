import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="exercise" options={{ headerShown: false }} />
      <Stack.Screen name="Edit" options={{
        title: 'Edit words', headerStyle: {
          backgroundColor: '#333'
        }, headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
    </Stack>
  );
}