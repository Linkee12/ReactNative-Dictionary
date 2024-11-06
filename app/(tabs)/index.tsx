import React from "react";
import { StyleSheet, TextInput, View, Text, Platform, FlatList } from "react-native";
import Button from "../ui/Button";
import ListItem from "../ui/ListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

export default function AddWords() {
  const [engText, onChangeEngText] = React.useState('');
  const [hunText, onChangeHunText] = React.useState('');
  const startHeight = useSharedValue(0);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const listStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(startHeight.value, config),
    };
  });

  return (<View
    style={styles.container}>

    <SafeAreaView style={{flex:1}} >
      <Text style={styles.text}>Add words</Text>
      <View style={{gap:10}}><TextInput
        style={styles.input}
        onChangeText={onChangeEngText}
        value={engText}
        autoCapitalize="sentences"
        placeholder="English"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeHunText}
        value={hunText}
        autoCapitalize="sentences"
        placeholder="Hungary"
      />
      <View style={styles.buttonContainer}>
        <Button label={"Translate"} onPress={()=>{}}/>
        <Button label={"Get example"} 
          onPress={() => startHeight.value =350}/>
      </View></View>
      <Text style={{color: "#517b7e",fontWeight:600,fontSize:16}}>Example sentences: </Text>
      <View style={styles.list}>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <ListItem text={item.key}/>}
        style={listStyle}
      />
    </View>
    </SafeAreaView>

  </View>)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    gap:10,
    backgroundColor: "black",
    padding:15,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: "white",
    backgroundColor: "rgb(32,35,42)"
  },
  text: {
    fontWeight: 700,
    fontSize: 36,
    textAlign: "center",
    padding: 16,
    color: "#517b7e",
    fontFamily: Platform.select({
      android: 'Inter_900Black',
      ios: 'Inter-Black'
    })
  },
  buttonContainer: {
    flex: 1,
    marginBottom:20,
  },
  listItem:{
    color:"rgb(255,255,255)"

  },
  list:{
    flex:4
  }
})