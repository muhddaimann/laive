import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { useChat } from "../hooks/useChat";

type Message = {
  from: "user" | "ai";
  text: string;
};

export default function ConvCard() {
  const theme = useTheme();
  const { messages: fullMessages } = useChat();
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullMessages.length) {
        const message = fullMessages[index] as Message;
        setDisplayedMessages((prev) => [...prev, message]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, Math.random() * 1000 + 1000);

    return () => clearInterval(interval);
  }, [fullMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  }, [displayedMessages]);

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
      <ScrollView ref={scrollRef} contentContainerStyle={styles.chatContainer}>
        {displayedMessages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              msg.from === "user"
                ? {
                    alignSelf: "flex-end",
                    backgroundColor: theme.colors.primary,
                    borderTopRightRadius: 0,
                  }
                : {
                    alignSelf: "flex-start",
                    backgroundColor: theme.colors.surfaceVariant,
                    borderTopLeftRadius: 0,
                  },
            ]}
          >
            <Text
              style={{
                color:
                  msg.from === "user"
                    ? theme.colors.onPrimary
                    : theme.colors.onSurfaceVariant,
              }}
            >
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 400,
    height: 400,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  chatContainer: {
    padding: 16,
    gap: 12,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
  },
});
