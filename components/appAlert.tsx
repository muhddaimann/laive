import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./appText";

type Props = {
  visible: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const maxWidth = 320;

export default function AppAlert({
  visible,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "Yes",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: Props) {
  const theme = useTheme();

  if (!visible) return null;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              width: "100%",
              maxWidth,
              shadowColor: theme.colors.shadow,
            },
          ]}
        >
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name="robot-excited-outline"
              size={44}
              color={theme.colors.primary}
            />
          </View>

          <View style={styles.textWrapper}>
            <AppText variant="subtitle" style={styles.title}>
              {title}
            </AppText>
            <AppText variant="body" style={styles.message}>
              {message}
            </AppText>
          </View>

          <View style={styles.actions}>
            {onCancel && (
              <TouchableOpacity onPress={onCancel} style={styles.textButton}>
                <AppText variant="body" style={{ color: theme.colors.primary }}>
                  {cancelText}
                </AppText>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={onConfirm}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
            >
              <AppText variant="body" style={{ color: theme.colors.onPrimary }}>
                {confirmText}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  iconWrapper: {
    marginBottom: 4,
  },
  textWrapper: {
    alignItems: "center",
    gap: 6,
  },
  title: {
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    maxWidth: 240,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  textButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
});
