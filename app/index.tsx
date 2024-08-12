import { Link } from 'expo-router';
import { Pressable, View,Text } from 'react-native';
import { StyleSheet } from 'react-native';

export default function Index() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    linkText: {
      fontSize: 18,
      color: '#007bff', // Link color
      margin: 10,
    },
  });
  return (<View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"blue"
      }}
    >
      <View style={styles.container}>
      <Link href="/exercise" asChild>
        <Text style={styles.linkText}>Exercise</Text>
      </Link>
      <Link href="/addWords" asChild>
        <Text style={styles.linkText}>Add words</Text>
      </Link>
      <Link href="/dictionary" asChild>
        <Text style={styles.linkText}>Dictionary</Text>
      </Link>
      <Link href="/settings" asChild>
        <Text style={styles.linkText}>Settings</Text>
      </Link>
    </View></View>)}