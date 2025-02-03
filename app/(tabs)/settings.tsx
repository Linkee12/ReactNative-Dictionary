import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useSQLiteContext } from "expo-sqlite";
export default function AddWords() {

  type Settings = {
    id: number,
    value: string,
  }

  const [selectedLanguage, setSelectedLanguage] = useState();
  const db = useSQLiteContext()



  async function setup(value: string) {
    try {
      const result = await db.getAllAsync<Settings>('UPDATE settings SET value = ? WHERE id = ?', value, '0')
      console.log("done :)")
    } catch (err) {
      console.log("Error:" + err)
    }
  }
  return (<View style={styles.container} >
    <View style={styles.line}>
      <Text style={styles.text}>
        First word:
      </Text>
      <Picker
        style={styles.dropDrown}
        mode="dropdown"
        selectedValue={selectedLanguage}
        onValueChange={async (itemValue, itemIndex) => {
          if (itemValue === undefined) return
          setSelectedLanguage(itemValue)
          setup(itemValue)
        }
        }>
        <Picker.Item label="Hungary" value="hun" />
        <Picker.Item label="English" value="eng" />
        <Picker.Item label="Random" value="random" />
      </Picker>
    </View>

  </View>)

}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#121212"
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#33B074",
  },
  dropDrown: {
    backgroundColor: "131B19",
    color: "#33B074",
    width: "50%"
  },
  line: {
    flexDirection: "row",
    gap: 6,
  }
})