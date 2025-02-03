import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { View, StyleSheet, FlatList } from 'react-native';
import ListItem from '../ui/ListItem';
import { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

type Words = {
  id: number,
  hun: string,
  eng: string,
}

export default function dictionary() {
  const randomWidth = useSharedValue(0);
  const db = useSQLiteContext()
  const [words, setWords] = useState<Words[]>([]);

  useEffect(() => {
    async function setup() {
      try {
        const result = await db.getAllAsync<Words>('SELECT * FROM words')
        setWords(result);
      } catch (err) {
        console.log("Error:" + err)
      }
    }
    setup();
  }, []);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const listStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(randomWidth.value, config),
    };
  });
  if (words.length === 0) return
  return (
    <View style={styles.list}>
      <FlatList
        data={words}
        renderItem={({ item }) => <ListItem text={item} />}
        style={listStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  list: {
    flex: 4,
    backgroundColor: '#000',
    padding: 7,
    paddingTop: 35,
  },
  listItem: {
    color: "rgb(255,255,255)",
  }
});
