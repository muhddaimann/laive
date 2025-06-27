import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { useToggle } from "../contexts/themeContext";

export default function DarkToggle() {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useToggle();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[
        styles.button,
        {
          backgroundColor: isDarkMode
            ? theme.colors.outline
            : theme.colors.background,
        },
      ]}
    >
      <MaterialCommunityIcons
        name={isDarkMode ? "weather-sunny" : "weather-night"}
        size={22}
        color={
          isDarkMode
            ? theme.colors.onBackground
            : theme.colors.secondary
        }
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});
