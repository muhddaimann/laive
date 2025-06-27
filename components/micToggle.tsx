import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

export default function MicToggle() {
  const theme = useTheme();
  const [micOn, setMicOn] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setMicOn(!micOn)}
      style={[styles.button, { backgroundColor: theme.colors.background }]}
    >
      <MaterialCommunityIcons
        name={micOn ? "microphone-off" : "microphone"}
        size={24}
        color={micOn ? theme.colors.error : theme.colors.onBackground}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
