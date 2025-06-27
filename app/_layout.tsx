import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider, useToggle } from "../contexts/themeContext";
import { LevelProvider } from "../contexts/levelContext";

function LayoutWithTheme() {
  const { theme } = useToggle();

  return (
    <PaperProvider theme={theme}>
      <LevelProvider>
        <StatusBar barStyle="dark-content" />
        <Stack screenOptions={{ headerShown: false }} />
      </LevelProvider>
    </PaperProvider>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <LayoutWithTheme />
    </ThemeProvider>
  );
}
