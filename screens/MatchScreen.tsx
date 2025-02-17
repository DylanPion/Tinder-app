import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import "react-native-gesture-handler";

// Composant principal de l'écran Match
const MatchScreen = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Utilisé pour gérer la carte affichée
  const [swipeAnim] = useState(new Animated.Value(0)); // Animation pour le swipe

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=15");
        const data = await response.json();
        const userData = data.results.map((user) => ({
          id: user.login.uuid,
          firstName: user.name.first,
          lastName: user.name.last,
          age: user.dob.age,
          description: "Aime les aventures et les rencontres!", // Description statique
          image: user.picture.large,
        }));
        setUsers(userData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchUsers();
  }, []);

  // Fonction pour gérer les actions "like" ou "dislike"
  const handleSwipe = (direction) => {
    if (direction === "like") {
      console.log("You liked", users[currentIndex].firstName);
    } else {
      console.log("You disliked", users[currentIndex].firstName);
    }

    // Animation de swipe
    Animated.timing(swipeAnim, {
      toValue: direction === "like" ? 300 : -300,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      swipeAnim.setValue(0); // Réinitialiser l'animation après le swipe
      setCurrentIndex(currentIndex + 1); // Passer à la prochaine carte
    });
  };

  // Si nous avons épuisé la liste des utilisateurs
  if (currentIndex >= users.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.endMessage}>Fin des profils!</Text>
      </View>
    );
  }

  // Utilisation de l'utilisateur actuel
  const currentUser = users[currentIndex];

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ translateX: swipeAnim }],
          },
        ]}
      >
        <Image
          source={{ uri: currentUser.image }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>
          {currentUser.firstName} {currentUser.lastName}, {currentUser.age}
        </Text>
        <Text style={styles.description}>{currentUser.description}</Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, styles.dislikeButton]}
            onPress={() => handleSwipe("dislike")}
          >
            <Text style={styles.buttonText}>Dislike</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.likeButton]}
            onPress={() => handleSwipe("like")}
          >
            <Text style={styles.buttonText}>Like</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "50%",
    alignSelf: "center",
    elevation: 10, // Ombre de la carte
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 85,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#ddd",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    width: 120,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  dislikeButton: {
    backgroundColor: "#ff4d4d",
  },
  likeButton: {
    backgroundColor: "#4caf50",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  endMessage: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
});

export default MatchScreen;
