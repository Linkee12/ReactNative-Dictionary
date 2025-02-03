import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const CARD_WIDTH = Dimensions.get('window').width * 0.8;
const CARD_HEIGHT = Dimensions.get('window').height * 0.6;

type CardProps = {
    wordPair: Words
}
type Words = {
    id: number,
    hun: string,
    eng: string,
}
type Settings = {
    id: number,
    value: string,
}


const Card = (props: CardProps) => {

    const [lang, setLang] = useState<'hun' | 'eng'>("hun");
    const word = props.wordPair[lang]
    return (
        <TouchableWithoutFeedback onPress={() => setLang(l => l === 'eng' ? 'hun' : 'eng')}>
            <View style={styles.card}>
                <Text style={styles.text}>{word}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};



const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: '#2C2C2C',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        padding: 15,
    },
    cardText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    text: {
        color: '#fff',
        fontSize: 26,
        fontWeight: "bold",

    }
});

export default Card;

