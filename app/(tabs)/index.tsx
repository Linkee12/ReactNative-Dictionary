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
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import Toast from 'react-native-toast-message';
import toastConfig from '../model/toastConfig';
import Logo from "../../assets/logo.svg";

export default function DictionaryScreen() {

  const db = useSQLiteContext()
  const [hungarianWord, setHungarianWord] = useState('');
  const [englishWord, setEnglishWord] = useState('');
  const [examples, setExamples] = useState<string[]>([]);


  const handleTranslate = () => {
    Toast.show({
      type: 'success',
      text1: 'Item Saved!',
    });
  };

  const handleSave = async () => {
    if (englishWord.length > 0 && hungarianWord.length > 0) {
      try {
        await db.runAsync('INSERT INTO words (hun, eng) VALUES (?, ?)', hungarianWord, englishWord);
        Toast.show({
          type: 'success',
          text1: 'Item Saved!',
        });
        setEnglishWord("")
        setHungarianWord("")
      } catch {
        Toast.show({
          type: 'error',
          text1: 'Oops, something went wrong.',
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error ',
        text2: ' All fields are required.'
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      ><View style={styles.logoContainer}>
          <Logo width={"100%"} height={"100%"} />
        </View>
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
            <MaterialIcons name="save" size={28} color="#C2E6FF" />
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.button, flex: 1 }} onPress={handleTranslate}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "center" }}>
              <AntDesign name="swap" size={28} color="#C2E6FF" />
              <Text style={{ fontSize: 24, color: "#C2E6FF", fontWeight: 'bold' }}>Translate</Text>
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
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 10,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 900,
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
    backgroundColor: '#003362',
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
  logoContainer: {
    flex: 0.5,
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  }
});

