import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import AppText from "./appText";

export default function GreetingCard() {
  const theme = useTheme();

  return (
    <View style={styles.card}>
      <AppText variant="title">Hello, welcome back!</AppText>
      <AppText variant="body" style={{ marginTop: 8 }}>
        Let’s get started with your tasks today.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 400,
    height: 200,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 24,
    textAlign: "center",
  },
});
