import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { Picker } from '@react-native-picker/picker';
export default function AddWords() {

  type Settings = {
    id: number,
    value: string,
  }

  const [selectedLanguage, setSelectedLanguage] = useState();
  const db = useSQLiteContext()



  async function setup(value: string) {
    try {
      await db.runAsync('UPDATE settings SET value = ? WHERE id = ?', [value, '1']);
      const rows = await db.getAllAsync<Settings>('SELECT * FROM settings');
    } catch (err) {
      console.log("Error:" + err)
    }
  }
  return (<View style={styles.container} >
    <View style={styles.column}>
      <Text style={styles.text}>
        First word:
      </Text>
      <Picker
        style={styles.dropDrown}
        dropdownIconColor="#fff"
        mode="dropdown"
        selectedValue={selectedLanguage}
        onValueChange={async (itemValue, itemIndex) => {
          if (itemValue === undefined) return
          setSelectedLanguage(itemValue)
          await setup(itemValue)
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
    color: "#fff",
  },
  dropDrown: {
    backgroundColor: "#121212",
    color: "#fff",
    width: "50%",

  },
  column: {
    flexDirection: "column",
    gap: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBlockColor: "#fff",
    borderTopWidth: 2,
    borderBottomWidth: 2,
  }
})