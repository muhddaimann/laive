import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { useLevel } from "../contexts/levelContext";

export default function ExpandToggle() {
  const theme = useTheme();
  const { level, setLevel } = useLevel();

  const isLevel1 = level === 1;

  const backgroundColor = isLevel1
    ? theme.colors.background
    : theme.colors.primary;

  const iconColor = isLevel1 ? theme.colors.primary : theme.colors.onPrimary;

  const toggleLevel = () => {
    setLevel(isLevel1 ? 2 : 1);
  };

  return (
    <TouchableOpacity
      onPress={toggleLevel}
      style={[styles.button, { backgroundColor }]}
    >
      <MaterialCommunityIcons
        name={isLevel1 ? "chevron-right" : "chevron-left"}
        size={24}
        color={iconColor}
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
