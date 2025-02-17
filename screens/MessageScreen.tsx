import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

const MessageScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=15");
        const data = await response.json();
        const userData = data.results.map((user) => ({
          id: user.login.uuid,
          firstName: user.name.first,
          lastName: user.name.last,
          lastMessage: "Salut, comment ça va ?", // Dernier message fictif
          messageTime: "12:30 PM", // Heure du dernier message fictive
          unreadMessages: Math.floor(Math.random() * 5), // Nombre de messages non lus aléatoire
          image: user.picture.large,
        }));
        setUsers(userData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchUsers();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.chatCard}>
      <Image source={{ uri: item.image }} style={styles.profileImage} />
      <View style={styles.chatContent}>
        <Text style={styles.name}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      <View style={styles.chatInfo}>
        <Text style={styles.time}>{item.messageTime}</Text>
        {item.unreadMessages > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadMessages}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  chatCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 14,
    color: "gray",
  },
  chatInfo: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  time: {
    fontSize: 12,
    color: "gray",
  },
  unreadBadge: {
    backgroundColor: "#ff4d4d",
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginTop: 5,
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
  },
  list: {
    paddingBottom: 20,
  },
});

export default MessageScreen;
