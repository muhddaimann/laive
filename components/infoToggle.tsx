import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import AppAlert from "./appAlert";

export default function InfoToggle() {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={[styles.button, { backgroundColor: theme.colors.background }]}
      >
        <MaterialCommunityIcons
          name="information-variant"
          size={24}
          color={theme.colors.primary}
        />
      </TouchableOpacity>

      <AppAlert
        visible={visible}
        title="Laive"
        message="Version 1.0.0"
        confirmText="OK"
        onConfirm={() => setVisible(false)}
      />
    </>
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
