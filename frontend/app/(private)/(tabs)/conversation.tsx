import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { user } from "../../../utils/data";
import { useRouter } from "expo-router";

const ConversationListScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      <FlatList
        data={user}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => router.push(`/conversation/${item.id}`)}
          >
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.chatInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.lastMessage}>
                Appuyez pour commencer la conversation
              </Text>
            </View>
            <Text style={styles.distance}>{item.distance} km</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E1FF",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A3B8F",
  },
  chatItem: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E6E1FF",
    backgroundColor: "#FFF",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#6B4EFF",
  },
  chatInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#4A3B8F",
  },
  lastMessage: {
    fontSize: 14,
    color: "#4A3B8F",
  },
  distance: {
    fontSize: 12,
    color: "#6B4EFF",
    fontWeight: "500",
  },
});

export default ConversationListScreen;
