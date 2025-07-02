import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';


const CARD_WIDTH = Dimensions.get('window').width * 0.8;
const CARD_HEIGHT = Dimensions.get('window').height * 0.6;

type CardProps = {
    wordPair: Words,
    settings: string
}
type Words = {
    id: number,
    hun: string,
    eng: string,
}

const Card = (props: CardProps) => {
    const getInitialLang = () => {
        if (props.settings === "hun" || props.settings === "eng") return props.settings;
        if (props.settings === "random") return Math.random() < 0.51 ? "hun" : "eng";
        return "hun";
    };

    const [lang, setLang] = useState<"hun" | "eng">(getInitialLang());

    useEffect(() => {
        setLang(getInitialLang());
    }, [props.settings, props.wordPair.eng]);
    return (
        <Pressable onPress={() => setLang(p => p === 'eng' ? 'hun' : 'eng')}>
            <View style={styles.card}>
                <Text style={styles.text}>{props.wordPair[lang]}</Text>
            </View>
        </Pressable>
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

