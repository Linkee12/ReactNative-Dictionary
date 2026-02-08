import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  LayoutAnimation,
} from "react-native";

type CollectionProps = {
  id: number;
  name: string;
};

export default function Collection(props: CollectionProps) {
  const color = getColor(props.id);
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsEdit(!isEdit);
  };
  return (
    <Pressable
      onLongPress={() => toggleEdit()}
      onPress={() => isEdit && setIsEdit(false)}
    >
      <LinearGradient
        colors={[color.bg[0], color.bg[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.collection, isEdit && styles.collectionEdit]}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: color.font, fontSize: 24 }}>{props.name}</Text>
        </View>
      </LinearGradient>
    </Pressable>
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
  collectionEdit: {
    transform: [{ scale: 0.95 }],
  },
});
