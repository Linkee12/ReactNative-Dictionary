import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Card from '../../ui/Card';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSQLiteContext } from 'expo-sqlite';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router'

type Words = {
  id: number,
  hun: string,
  eng: string,
}
type Settings = {
  id: number,
  value: string,
}

export default function exercise() {
  const offset = useSharedValue(0);
  const db = useSQLiteContext()
  const [words, setWords] = useState<Words[]>([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [indexArr, setIndexArr] = useState<number[]>([]);
  const directionShared = useSharedValue(0);
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();
  const [firstLang, setFirstLang] = useState<string>();



  useEffect(() => {
    async function setup() {
      try {
        const result = await db.getAllAsync<Words>('SELECT * FROM words')
        const getFirstLang = await db.getAllAsync<Settings>('SELECT * FROM settings')
        setFirstLang(getFirstLang[0].value)
        setWords(result);
        setIndexArr(result.map((e, i) => i))
        setWordIdx(Math.floor(Math.random() * result.length))
      } catch (err) {
        console.log("Error:" + err)
      }
    }
    setup();
  }, [refresh, isFocused]);
  useAnimatedReaction(
    () => directionShared.value,
    (cur, prev) => {
      if (cur !== prev) {
        if (directionShared.value > 0) {
          if (indexArr.length > 1) {
            const newIdxArr = indexArr.filter((e) => e != wordIdx)
            let newIndex
            do { newIndex = Math.floor(Math.random() * indexArr.length) } while (indexArr[newIndex] === wordIdx)
            runOnJS(setIndexArr)(newIdxArr)
            runOnJS(setWordIdx)(indexArr[newIndex])
          } else if (indexArr.length === 1) {
            runOnJS(setIndexArr)([])
          }
        }
        else if (directionShared.value < 0) {
          if (indexArr.length > 1) {
            let newIndex
            do { newIndex = Math.floor(Math.random() * indexArr.length) } while (newIndex === wordIdx)
            runOnJS(setWordIdx)(indexArr[newIndex])
          }
        }
      }
    })

  const pan = Gesture.Pan()
    .onChange((event) => {
      if (event.translationX < 70 && event.translationX > -70) {
        offset.value += event.changeX;
      }
    })
    .onFinalize((event) => {

      if (event.translationX < -39) {
        if (directionShared.value < 0) {
          directionShared.value -= 1;
        } else {
          directionShared.value = -1;
        }
      } else if (event.translationX > 39) {
        if (directionShared.value > 0) {
          directionShared.value += 1;
        } else {
          directionShared.value = 1;
        }
      }
      offset.value = withDelay(0.1, withTiming(0));
    });


  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));
  if (!words) return

  const wordPair = indexArr.length > 0 ? words[wordIdx] : { id: 0, hun: "You have no more word", eng: "You have no more word" }
  const params = indexArr.length > 0 ? words[wordIdx] : { id: 0, hun: "", eng: "" }

  async function deleteWord(id: number) {
    if (words.length > 0) {
      await db.runAsync('DELETE FROM words WHERE id = $id', { $id: id })
      setRefresh((p) => !p)
    }
  }


  return (

    <GestureHandlerRootView style={styles.container}>
      <Animated.View style={[animatedStyles, styles.cardContainer]}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.cardWrapper, animatedStyles]}>
            <Card wordPair={wordPair} settings={firstLang ?? "hun"} />
          </Animated.View>
        </GestureDetector>
      </Animated.View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttons} onPress={async () => { deleteWord(words[wordIdx].id) }}>
          <MaterialCommunityIcons name="delete-forever" size={50} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => { router.navigate({ pathname: './Edit', params: params }) }}
        ><FontAwesome name="edit" size={50} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons} onPress={() => setIndexArr(words.map((e, i) => i))}>
          <Ionicons name="reload-circle-sharp" size={50} color="#fff" />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    position: 'absolute',
  },
  buttonContainer: {
    maxWidth: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    flex: 0.15,
    marginBottom: 50,
  },
  buttons: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#2C2C2C',
    height: "100%",
    marginInline: 10,
    borderRadius: 8,
  }
});
