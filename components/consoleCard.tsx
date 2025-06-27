import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useChat } from "../hooks/useChat";

type Log = {
  text: string;
  time: string;
};

export default function ConsoleCard() {
  const theme = useTheme();
  const { logs: fullLogs } = useChat();
  const [displayedLogs, setDisplayedLogs] = useState<Log[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    let index = 0;

    function showNextLog() {
      if (index < fullLogs.length) {
        const next = fullLogs[index];
        if (next) {
          setDisplayedLogs((prev) => [...prev, next]);
        }
        index++;
        setTimeout(showNextLog, Math.random() * 1000 + 1000);
      }
    }

    showNextLog();
  }, [fullLogs]);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [displayedLogs]);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.outline,
        },
      ]}
    >
      <ScrollView ref={scrollRef} contentContainerStyle={styles.logContainer}>
        {displayedLogs.map((log, index) => {
          const isClient = log?.text?.includes("[client]");
          const logColor = isClient
            ? theme.colors.primary
            : theme.colors.secondary;

          return (
            <Text key={index} style={{ color: logColor }}>
              {log?.time} {log?.text}
            </Text>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 400,
    height: 300,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  logContainer: {
    padding: 16,
    gap: 8,
  },
});
