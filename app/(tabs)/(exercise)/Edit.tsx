import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import Toast from 'react-native-toast-message';
import toastConfig from '../../model/toastConfig';
import { useLocalSearchParams } from 'expo-router';
import Logo from "../../../assets/logo.svg";

type Params = {
    id: string,
    hun: string,
    eng: string,
}

export default function Edit() {
    const params = useLocalSearchParams<Params>();
    const db = useSQLiteContext()
    const [hungarianWord, setHungarianWord] = useState(params.hun);
    const [englishWord, setEnglishWord] = useState(params.eng);


    const handleSave = async () => {
        if (englishWord.length > 0 && hungarianWord.length > 0) {
            try {
                await db.runAsync('UPDATE words SET hun = ?, eng=? WHERE id = ?', hungarianWord, englishWord, params.id);
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
            <View style={styles.logoContainer}>
                <Logo width={"100%"} height={"100%"} />
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#888"
                        value={hungarianWord}
                        onChangeText={setHungarianWord}
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#888"
                        value={englishWord}
                        onChangeText={setEnglishWord}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text><MaterialIcons name="save" size={40} color="#C2E6FF" /></Text>
                    <Text style={styles.buttonText}>Save changes</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <Toast config={toastConfig} />
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

    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'stretch',
        backgroundColor: '#003362',
        padding: 10,
        borderRadius: 15,
        marginTop: 5,
        marginHorizontal: 20,
    },
    buttonText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#C2E6FF',
        paddingLeft: 6,
    },
    logoContainer: {
        flex: 0.5,
        justifyContent: "center",
        paddingLeft: 20,
        paddingRight: 20,
    }

});

