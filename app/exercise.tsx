import { Link } from "expo-router";
import { View } from "react-native";

export default function Exercise(){
    return (<View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:"red"
    }}
  >
    <Link href="/">main</Link>
  </View>)
}