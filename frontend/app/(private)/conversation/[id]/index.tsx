import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { messageData } from "../../../../utils/messageData";
import Message from "../../../../components/Message";
import { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function ConversationScreen() {
  const { id } = useLocalSearchParams();
  const [newMessage, setNewMessage] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (newMessage.trim().length === 0) return;
    setNewMessage("");
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messageData.map((msg, index) => (
          <Message
            key={msg.id}
            message={msg.message}
            isSent={index % 2 === 0}
          />
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Écrivez votre message..."
          placeholderTextColor="#666"
          multiline
          maxHeight={100}
        />
        <Pressable style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={24} color="#6B4EFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FF",
  },
  scrollContent: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#E6E1FF",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  input: {
    flex: 1,
    backgroundColor: "#F8F7FF",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    fontSize: 16,
    color: "#4A3B8F",
    borderWidth: 1,
    borderColor: "#E6E1FF",
  },
  sendButton: {
    padding: 8,
    backgroundColor: "#6B4EFF",
    borderRadius: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
