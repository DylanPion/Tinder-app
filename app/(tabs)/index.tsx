import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatchScreen from "@/screens/MatchScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import MessageScreen from "@/screens/MessageScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        let iconName: string = "home"; // Valeur par défaut

        if (route.name === "Match") {
          iconName = "football";
        } else if (route.name === "Profil") {
          iconName = "person";
        } else if (route.name === "Message") {
          iconName = "chatbox-outline";
        }

        return {
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={iconName} size={size} color={color} />
          ),
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerShown: false, // Masque le titre dans le header
        };
      }}
    >
      <Tab.Screen name="Match" component={MatchScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
      <Tab.Screen name="Message" component={MessageScreen} />
    </Tab.Navigator>
  );
}
