import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, Text } from 'react-native';

type CollectionProps = {
    id: number,
    name: string
}

export default function Collection(props: CollectionProps) {

    const color = getColor(props.id)

    return (
        <View style={styles.collectionContainer}>

            <LinearGradient
                colors={[color.bg[0], color.bg[1]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.collection}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: color.font }}>{props.name}</Text>
                </View>
            </LinearGradient>

        </View>
    );
}
function getColor(idx: number) {
    const colors = [
        { bg: ["#18191B", "#321E0C"], font: "#FFA057" },
        { bg: ["#18191B", "#132C21"], font: "#3BC984" },
        { bg: ["#18191B", "#36172E"], font: "#FF8DCC" },
        { bg: ["#18191B", "#0E2845"], font: "#70B8FF" },
    ];
    return colors[idx % 4];
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

    }, collectionContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    collection: {
        backgroundColor: "#333333",
        padding: 10,
        width: 150,
        height: 170,
        borderRadius: 15,
        margin: 10,
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.1)",
    },
});
