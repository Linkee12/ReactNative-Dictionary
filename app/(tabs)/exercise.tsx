import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Card from '../ui/Card';
import { SQLiteProvider, } from 'expo-sqlite';
import migrateDbIfNeeded from '../schema/dbSchema';




export default function exercise() {
  const [trigger, setTrigger] = useState(0)
  const offset = useSharedValue(0);
  const width = useSharedValue(0);
  const pan = Gesture.Pan()
    .onChange((event) => {
      offset.value += event.changeX;
    })

    .onFinalize((event) => {
      if (event.translationX < -39) { trigger < 0 ? setTrigger((trigger) => --trigger) : setTrigger(-1) }
      else if (event.translationX > 39) { trigger > 0 ? setTrigger((trigger) => ++trigger) : setTrigger(+1) }
      offset.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true,
        clamp: [-(width.value), width.value],
      });
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));


  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.View style={[animatedStyles, styles.cardContainer]}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.cardWrapper, animatedStyles]}>
            <SQLiteProvider databaseName="dictionary.db" onInit={migrateDbIfNeeded}>
              <Card trigger={trigger} />
            </SQLiteProvider>
          </Animated.View>
        </GestureDetector>

      </Animated.View>
    </GestureHandlerRootView>
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
});
