import React from "react";
import { Text as RNText, TextProps, TextStyle } from "react-native";
import { useTheme } from "react-native-paper";

type Variant = "title" | "subtitle" | "body" | "caption";

type Props = TextProps & {
  variant?: Variant;
  style?: TextStyle;
};

export default function AppText({ variant = "title", style, ...props }: Props) {
  const theme = useTheme();

  const variants: Record<Variant, TextStyle> = {
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: theme.colors.onSurface,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: "600",
      color: theme.colors.onSurface,
    },
    body: {
      fontSize: 16,
      fontWeight: "400",
      color: theme.colors.onSurface,
    },
    caption: {
      fontSize: 13,
      fontWeight: "400",
      color: theme.colors.onSurfaceVariant,
    },
  };

  return <RNText style={[variants[variant], style]} {...props} />;
}
