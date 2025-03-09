import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { profilData } from "../../../utils/profilData";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ProfilScreen = () => {
  const profile = profilData[0];
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon Profil</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => router.push("/settings")}
        >
          <FontAwesome name="cog" size={24} color="#6B4EFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: profile.image }} style={styles.profileImage} />
        <TouchableOpacity style={styles.editImageButton}>
          <FontAwesome name="camera" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {profile.name}, {profile.age}
        </Text>
        <Text style={styles.info}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde vitae
          adipisci eaque eum at provident ea ab veniam, nesciunt ratione amet
          voluptas itaque consequatur architecto. Obcaecati officiis ullam
          debitis facere? Adipisci iste illo impedit, necessitatibus repellat ab
          similique aspernatur quasi tempora itaque cupiditate sint, error
          incidunt ipsum fuga dignissimos blanditiis porro labore nemo enim
          eaque cumque!
        </Text>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Modifier le profil</Text>
      </TouchableOpacity>
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
    justifyContent: "space-between",
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
  settingsButton: {
    padding: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
    position: "relative",
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: "#6B4EFF",
  },
  editImageButton: {
    position: "absolute",
    bottom: 10,
    right: "30%",
    backgroundColor: "#6B4EFF",
    padding: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoContainer: {
    padding: 20,
    marginTop: 10,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4A3B8F",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  editButton: {
    margin: 20,
    padding: 15,
    backgroundColor: "#6B4EFF",
    borderRadius: 10,
    alignItems: "center",
  },
  editButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfilScreen;
