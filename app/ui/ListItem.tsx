import { StyleSheet, View, Pressable, Text } from 'react-native';

type Words = {
    id: number;
    hun: string;
    eng: string;
};

type ListItemProps = {
    text: Words;
};
export default function ListItem(props: ListItemProps) {
    return (
        <View style={styles.listItem}>
            <Text style={styles.listItem} >{props.text.eng}</Text>
            <Text style={styles.listItem} >{props.text.hun}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        flexDirection: "row",
        marginInline: 5,
        width: "auto",
        height: "auto",
        marginLeft: 0,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        color: "#fff",
        backgroundColor: 'rgb(32,35,42)',
        borderRadius: 5,

    }
});
