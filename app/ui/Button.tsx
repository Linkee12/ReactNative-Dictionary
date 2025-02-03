import { StyleSheet, View, Pressable, Text } from 'react-native';

type Props = {
    label: string;
    onPress: () => void;
};

export default function Button({ label, onPress }: Props) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 3,
        display: "flex",
        height: 40,
    },
    button: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: "#2a61db",
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: '#9db5e9',
        fontSize: 16,
        fontWeight: 600,
    },
});
