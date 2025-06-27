import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import { useLevel } from "../contexts/levelContext";
import IconCard from "../components/iconCard";
import GreetingCard from "../components/greetingCard";
import ConvCard from "../components/convCard";
import ConsoleCard from "../components/consoleCard";
import ActionBar from "../components/actionBar";

const { width } = Dimensions.get("window");

export default function Home() {
  const theme = useTheme();
  const { level } = useLevel();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const greetingOpacity = useRef(new Animated.Value(1)).current;
  const greetingHeight = useRef(new Animated.Value(1)).current;
  const iconTranslateX = useRef(new Animated.Value(0)).current;
  const rightPanelTranslateX = useRef(new Animated.Value(width)).current;
  const rightPanelOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: level === 1 || level === 2 ? 1.5 : 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    Animated.parallel([
      Animated.timing(greetingOpacity, {
        toValue: level === 0 ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(greetingHeight, {
        toValue: level === 0 ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [level]);

  useEffect(() => {
    if (level === 2) {
      Animated.parallel([
        Animated.timing(iconTranslateX, {
          toValue: -120,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(rightPanelTranslateX, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(rightPanelOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(iconTranslateX, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(rightPanelTranslateX, {
          toValue: width,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(rightPanelOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [level]);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }, { translateX: iconTranslateX }],
        }}
      >
        <IconCard />
      </Animated.View>

      <Animated.View
        style={{
          opacity: greetingOpacity,
          transform: [{ scaleY: greetingHeight }],
          height: greetingHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 100],
          }),
          overflow: "hidden",
        }}
      >
        <GreetingCard />
      </Animated.View>

      <Animated.View
        style={[
          styles.rightPanel,
          {
            transform: [{ translateX: rightPanelTranslateX }],
            opacity: rightPanelOpacity,
          },
        ]}
      >
        <ConvCard />
        <ConsoleCard />
      </Animated.View>

      <ActionBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  rightPanel: {
    position: "absolute",
    right: 400,
    top: 100,
    gap: 24,
  },
});
