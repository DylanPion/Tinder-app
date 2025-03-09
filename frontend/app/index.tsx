import { View, Image, Text } from "react-native";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isReady) {
    return <Redirect href="/swipe" />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F8F7FF",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../assets/logo.jpg")}
        style={{
          width: 200,
          height: 200,
          resizeMode: "contain",
          borderRadius: 100,
          borderWidth: 3,
          borderColor: "#6B4EFF",
        }}
      />
      <Text
        style={{
          color: "#4A3B8F",
          fontSize: 32,
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        Mew Meeting
      </Text>
      <Text
        style={{
          color: "#666",
          fontSize: 16,
          marginTop: 10,
          textAlign: "center",
          paddingHorizontal: 40,
        }}
      >
        Rencontrez des personnes qui partagent votre passion pour les chats
      </Text>
    </View>
  );
}
