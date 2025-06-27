import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { useLevel } from "../contexts/levelContext";
import DarkToggle from "./darkToggle";
import InfoToggle from "./infoToggle";
import MicToggle from "./micToggle";
import ExpandToggle from "./expandToggle";
import AppAlert from "./appAlert";

export default function ActionBar() {
  const theme = useTheme();
  const { level, setLevel } = useLevel();
  const [showConfirm, setShowConfirm] = useState(false);

  const isActive = level > 0;

  const handleToggle = () => {
    if (isActive) {
      setShowConfirm(true);
    } else {
      setLevel(1);
    }
  };

  const confirmStop = () => {
    setLevel(0);
    setShowConfirm(false);
  };

  const cancelStop = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.surface,
            shadowColor: theme.colors.shadow,
          },
        ]}
      >
        <DarkToggle />

        <TouchableOpacity
          onPress={handleToggle}
          style={[
            styles.pillButton,
            {
              backgroundColor: isActive
                ? theme.colors.errorContainer
                : theme.colors.primary,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={isActive ? "close" : "pulse"}
            size={22}
            color={
              isActive ? theme.colors.onErrorContainer : theme.colors.onPrimary
            }
          />
        </TouchableOpacity>

        {isActive ? (
          <>
            <MicToggle />
            <ExpandToggle />
          </>
        ) : (
          <InfoToggle />
        )}
      </View>

      <AppAlert
        visible={showConfirm}
        title="Stop Listening?"
        message="Are you sure you want to stop?"
        confirmText="Stop"
        cancelText="Cancel"
        onConfirm={confirmStop}
        onCancel={cancelStop}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 40,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  pillButton: {
    height: 48,
    minWidth: 100,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});
