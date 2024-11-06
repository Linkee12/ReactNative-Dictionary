import { StyleSheet, View, Pressable, Text } from 'react-native';
type Props={
    text:String
}

export default function ListItem(props:Props) {
    return (
        <View style={styles.listItem}>
            <Text style={styles.listItem} >{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {
        width: "auto",
        height: "auto",
        marginLeft:0,
        marginTop:5,
        marginBottom: 5,
        marginRight:0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        color: "#fff",
        backgroundColor:'rgb(32,35,42)',
        borderRadius:5,
        
}});
