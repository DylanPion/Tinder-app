import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { Authenticate } from "../../../service/authService";

interface FormData {
  email: string;
  password: string;
}

interface Errors extends FormData {
  general: string;
}

// Stockage sécurisé
const saveSecureItem = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED,
    });
  } catch (error) {
    console.error("Erreur de stockage sécurisé:", error);
  }
};

const LoginScreen = () => {
  const { setIsAuthenticated, setUser }: any = useUserStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
    general: "",
  });
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: async (credentials: {
      email: string;
      password: string;
    }): Promise<any> => {
      const response = await Authenticate(credentials);
      return response;
    },
    onSuccess: (data) => {
      setIsAuthenticated(true);
      console.log("data", data);
      saveSecureItem("user-token", data.token);
      saveSecureItem("user_id", JSON.stringify(data));
      setUser(data);
      router.push("/");
    },
    onError: (error) => {
      console.log("error", error);
      setErrors((prev) => ({
        ...prev,
        general: "Une erreur s'est produite lors de la connexion",
      }));
    },
  });

  // Function to validate the form
  const validateForm = (): boolean => {
    let newErrors: Errors = {
      email: "",
      password: "",
      general: "",
    };

    let isValid: boolean = true;

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
      isValid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Le mot de passe est requis";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    setErrors({
      email: "",
      password: "",
      general: "",
    });

    if (!validateForm()) return;

    mutation.mutate({ email: formData.email, password: formData.password });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Connexion</Text>
      </View>
      <View style={styles.form}>
        {errors.general && (
          <Text style={styles.errorText}>{errors.general}</Text>
        )}
        <View style={styles.inputContainer}>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email"
            placeholderTextColor="#666"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Mot de passe"
            placeholderTextColor="#666"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
          />
        </View>

        <Pressable
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "CHARGEMENT..." : "SE CONNECTER"}
          </Text>
        </Pressable>
        <Text style={styles.terms}>
          Vous n'avez pas de compte ?{" "}
          <Text style={styles.link} onPress={() => router.push("/register")}>
            S'inscrire
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FF",
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4A3B8F",
    marginTop: 20,
  },
  form: {
    paddingHorizontal: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    color: "#4A3B8F",
    borderWidth: 1,
    borderColor: "#E6E1FF",
  },
  inputError: {
    borderColor: "#FF0000",
  },
  button: {
    backgroundColor: "#6B4EFF",
    borderRadius: 30,
    paddingVertical: 16,
    marginTop: 24,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#A8A8A8",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  terms: {
    textAlign: "center",
    marginTop: 24,
    color: "#666",
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  link: {
    color: "#6B4EFF",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "#FF0000",
    marginBottom: 4,
    fontSize: 14,
  },
});

export default LoginScreen;
