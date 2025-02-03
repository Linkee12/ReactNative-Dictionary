
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: 'white', tabBarStyle: {
        backgroundColor: '#000',
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome6 name="add" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name={"(exercise)"}
        options={{
          title: "Exercise",
          headerShown: false,
          tabBarIcon: ({ color }) => <Entypo name="open-book" size={24} color={color} />,
        }}
      /><Tabs.Screen
        name="dictionary"
        options={{
          title: "Dictionary",
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bookshelf" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} Solid />,
        }}
      />
    </Tabs>
  );
}
