import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Modifier le profil</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require("../assets/profile.jpeg")}
          style={styles.profileImage}
        />

        <Text style={styles.name}>Stéphane, 28</Text>

        <Text style={styles.location}>Paris, France</Text>

        <Text style={styles.description}>
          Passionné de voyages et de rencontres, toujours à la recherche de
          nouvelles aventures. Aime discuter, explorer de nouveaux endroits et
          passer du temps avec des amis !
        </Text>

        <View style={styles.interestsContainer}>
          <Text style={styles.interestsTitle}>Centres d'intérêt </Text>
          <View style={styles.interests}>
            <Text style={styles.interest}>Voyages</Text>
            <Text style={styles.interest}>Musique</Text>
            <Text style={styles.interest}>Sport</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  card: {
    width: "90%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5, // Ombre de la carte pour Android
    alignItems: "center",
  },
  profileHeader: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  editButtonText: {
    fontSize: 14,
    color: "#000",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  interestsContainer: {
    marginBottom: 20,
  },
  interestsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  interests: {
    flexDirection: "row",
    justifyContent: "center",
  },
  interest: {
    fontSize: 16,
    marginHorizontal: 10,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  messageButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  messageButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  superLikeButton: {
    backgroundColor: "#ff1493",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  superLikeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  photoAlbumTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
  },
  photoAlbum: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  albumImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default ProfileScreen;
