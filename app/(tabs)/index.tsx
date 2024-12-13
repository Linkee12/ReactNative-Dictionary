import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export default function DictionaryScreen() {
  const [hungarianWord, setHungarianWord] = useState('');
  const [englishWord, setEnglishWord] = useState('');
  const [examples, setExamples] = useState<string[]>([
    "A kutya ugat. - The dog barks.",
    "Kérem a számlát. - I'd like the bill, please.",
    "Jó napot kívánok! - Good day!",
    "Szeretlek. - I love you.",
    "Hol van a legközelebbi metróállomás? - Where is the nearest metro station?",
  ]);

  const handleTranslate = () => {
    console.log('Translate button pressed');
  };

  const handleSave = () => {
    console.log('Save button pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <Image
          source={{ uri: 'https://placehold.co/200x50' }}
          style={styles.logo}
          accessibilityLabel="Modern Dictionary Logo"
        />
        <Text style={styles.title}>Modern Dictionary</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Hungarian word"
            placeholderTextColor="#888"
            value={hungarianWord}
            onChangeText={setHungarianWord}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter English word"
            placeholderTextColor="#888"
            value={englishWord}
            onChangeText={setEnglishWord}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <MaterialIcons name="save" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.button, flex: 1 }} onPress={handleTranslate}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "center" }}>
              <AntDesign name="swap" size={24} color="#000" />
              <Text style={{ fontSize: 17, paddingTop: 4 }}>Translate</Text>
            </View>


          </TouchableOpacity>

        </View>
        <Text style={styles.examplesTitle}>Example Sentences:</Text>
        <FlatList
          data={examples}
          renderItem={({ item }) => <Text style={styles.exampleItem}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
          style={styles.exampleList}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  logo: {
    width: 200,
    height: 50,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#fff',
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 20,
    gap: 20,
    marginHorizontal: 20,

  },
  button: {
    backgroundColor: '#BB86FC',
    padding: 15,
    borderRadius: 15,
  },
  examplesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    color: '#fff',
  },
  exampleList: {
    paddingHorizontal: 20,
  },
  exampleItem: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#fff',
  },
});

