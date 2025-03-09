import { Redirect, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import des composants personnalisés
import { useUserStore } from "@/store/userStore";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

// Création du client React Query
const client = new QueryClient();

// Fonction utilitaire pour récupérer un élément du stockage sécurisé
const getSecureItem = async (key: string) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error("Erreur de lecture sécurisée:", error);
    return null;
  }
};

export default function RootLayout() {
  // Détection de la plateforme web
  const web = Platform.OS === "web";
  const router = useRouter();

  // Récupération des états d'authentification depuis le store
  const { isAuthenticated, setIsAuthenticated }: any = useUserStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function getUserInSecureStore() {
      let user_id = null;
      if (web) {
        user_id = localStorage.getItem("user_id");
      }
      if (!web) {
        user_id = await getSecureItem("user_id");
      }
      if (user_id) {
        setIsAuthenticated(true);
      }
      setIsReady(true);
    }
    getUserInSecureStore();
  }, []);

  // Gérer les redirections dans un useEffect séparé
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    } else if (!isAuthenticated && isReady) {
      router.push("/login");
    }
  }, [isAuthenticated, isReady]);

  return (
    <QueryClientProvider client={client}>
      <Stack>
        {/* Route des onglets principaux */}
        <Stack.Screen
          name="(private)/(tabs)"
          options={{ headerShown: false }}
        />
        {/* Route pour les pages non trouvées */}
        <Stack.Screen name="+not-found" />
      </Stack>
      {/* Barre de statut adaptative */}
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
