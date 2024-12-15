import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const CARD_WIDTH = Dimensions.get('window').width * 0.8;
const CARD_HEIGHT = Dimensions.get('window').height * 0.6;

type CardProps = {
    trigger: number
}
type Words = {
    id: number,
    hun: string,
    eng: string,
}

const Card = (props: CardProps) => {

    const db = useSQLiteContext()
    const [rnd, setRnd] = useState(0)
    const [words, setWords] = useState<Words[]>([]);
    const [word, setWord] = useState<string>();

    useEffect(() => {
        async function setup() {
            const result = await db.getAllAsync<Words>('SELECT * FROM words');
            setWords(result);
            const index = Math.floor(Math.random() * words.length)
            setWord(words[index].hun)
            setRnd(index)
        }
        setup();
    }, []);

    useEffect(() => {
        console.log(words.length)
        if (words.length > 0) {
            setWord(words[rnd].hun)
            setWords(words.filter((word) => word != words[rnd]))
            setRnd(Math.floor(Math.random() * words.length))
        }
        else {
            setWord("You don't have more word")
        }
    }, [props.trigger])

    function selectRandomWord(words: Words[]) {
        const index = Math.floor(Math.random() * words.length)
        const selectedWordsPair = words[index]
        setWords(words.filter((word) => word != selectedWordsPair))
        return selectedWordsPair
    }
    return (
        <TouchableWithoutFeedback onPress={() => word == words[rnd].hun ? setWord(words[rnd].eng) : setWord(words[rnd].hun)}>
            <View style={styles.card}>
                <Text >{word}</Text>
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
    },
    cardText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Card;

