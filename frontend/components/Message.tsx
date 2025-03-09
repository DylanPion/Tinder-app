import { View, Text, StyleSheet, Image } from "react-native";

type MessageProps = {
  message: string;
  isSent: boolean;
  avatarUrl?: string;
};

export default function Message({
  message,
  isSent,
  avatarUrl = "https://placekitten.com/50/50",
}: MessageProps) {
  return (
    <View
      style={[
        styles.container,
        isSent ? styles.sentContainer : styles.receivedContainer,
      ]}
    >
      {!isSent && <Image source={{ uri: avatarUrl }} style={styles.avatar} />}
      <View
        style={[
          styles.bubble,
          isSent ? styles.sentBubble : styles.receivedBubble,
        ]}
      >
        <Text
          style={[styles.text, isSent ? styles.sentText : styles.receivedText]}
        >
          {message}
        </Text>
      </View>
      {isSent && <Image source={{ uri: avatarUrl }} style={styles.avatar} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    paddingHorizontal: 8,
  },
  sentContainer: {
    justifyContent: "flex-end",
  },
  receivedContainer: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "70%",
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  sentBubble: {
    backgroundColor: "#6B4EFF",
  },
  receivedBubble: {
    backgroundColor: "#F8F7FF",
    borderWidth: 1,
    borderColor: "#E6E1FF",
  },
  text: {
    fontSize: 16,
  },
  sentText: {
    color: "white",
  },
  receivedText: {
    color: "#4A3B8F",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
