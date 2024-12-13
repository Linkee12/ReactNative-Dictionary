import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';


const CARD_WIDTH = Dimensions.get('window').width * 0.8;
const CARD_HEIGHT = Dimensions.get('window').height * 0.6;

type CardProps = {
    word: string
}

type Words = {
    id: number,
    hun: string,
    eng: string,
}

const Card = (props: CardProps) => {

    const db = useSQLiteContext()
    const [words, setWords] = useState<Words[]>([]);

    useEffect(() => {
        async function setup() {
            const result = await db.getAllAsync<Words>('SELECT * FROM words');
            setWords(result);
        }
        setup();
    }, []);

    function selectRandomWord(words: Words[]) {
        const index = Math.floor(Math.random() * words.length)
        const selectedWordsPair = words[index]
        setWords(words.filter((word) => word != selectedWordsPair))
        return selectedWordsPair
    }
    return (
        <View style={styles.card}>
            <Text>{props.word}</Text>
        </View>
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
    },
    cardText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Card;

