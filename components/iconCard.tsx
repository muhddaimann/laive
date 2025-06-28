import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLevel } from "../contexts/levelContext";

const STATES = ["speaking", "listening", "thinking"] as const;
type StatusType = (typeof STATES)[number];

export default function IconCard() {
  const theme = useTheme();
  const { level } = useLevel();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [status, setStatus] = useState<StatusType>("speaking");

  useEffect(() => {
    if (level > 0) {
      animationRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      animationRef.current.start();
    } else {
      scaleAnim.setValue(1);
      animationRef.current?.stop();
    }
  }, [level]);

  useEffect(() => {
    if (level > 0) {
      let index = 0;
      intervalRef.current = setInterval(() => {
        index = (index + 1) % STATES.length;
        setStatus(STATES[index]);
      }, 2000);
    } else {
      setStatus("speaking");
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [level]);

  const getColor = () => {
    switch (status) {
      case "speaking":
        return theme.colors.primary;
      case "listening":
        return theme.colors.secondary;
      case "thinking":
        return theme.colors.outlineVariant;
      default:
        return theme.colors.outline;
    }
  };

  return (
    <View style={styles.card}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <MaterialCommunityIcons name="pulse" size={100} color={getColor()} />
      </Animated.View>
      {level > 0 && (
        <Text style={[styles.caption, { color: getColor() }]}>{status}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  caption: {
    marginTop: 12,
    fontSize: 16,
    fontStyle: "italic",
    textTransform: "capitalize",
  },
});
