import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { CreateAccount } from "../../../service/authService";
import { router } from "expo-router";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  city: string;
}

interface Errors extends FormData {
  general: string;
}

const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    city: "",
    general: "",
  });
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    city: "",
  });

  // Function to validate the form
  const validateForm = (): boolean => {
    let newErrors: Errors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      city: "",
      general: "",
    };

    let isValid: boolean = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le nom est requis";
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le prénom est requis";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
      isValid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Le mot de passe est requis";
      isValid = false;
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "La confirmation du mot de passe est requise";
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      isValid = false;
    }
    if (!formData.gender.trim()) {
      newErrors.gender = "Le genre est requis";
      isValid = false;
    }
    if (!formData.city.trim()) {
      newErrors.city = "La ville est requise";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Function to handle the register
  const handleRegister = async (): Promise<void> => {
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      city: "",
      general: "",
    });

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const { confirmPassword, ...submitData } = formData;
      const response = await CreateAccount(submitData);
      console.log(response);

      if (response.status === 201) {
        setTimeout(() => {
          router.push("/login");
        }, 500);
      }
    } catch (error) {
      console.log(error);
      setErrors((prev) => ({
        ...prev,
        general:
          "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Créer un compte</Text>
      </View>

      <View style={styles.form}>
        {errors.general && (
          <Text style={styles.errorText}>{errors.general}</Text>
        )}

        <View style={styles.inputContainer}>
          {errors.firstName ? (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          ) : null}
          <TextInput
            style={[styles.input, errors.firstName && styles.inputError]}
            placeholder="Nom"
            placeholderTextColor="#666"
            value={formData.firstName}
            onChangeText={(text) =>
              setFormData({ ...formData, firstName: text })
            }
          />
        </View>
        <View style={styles.inputContainer}>
          {errors.lastName ? (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          ) : null}
          <TextInput
            style={[styles.input, errors.lastName && styles.inputError]}
            placeholder="Prénom"
            placeholderTextColor="#666"
            value={formData.lastName}
            onChangeText={(text) =>
              setFormData({ ...formData, lastName: text })
            }
          />
        </View>
        <View style={styles.inputContainer}>
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}
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
          {errors.gender ? (
            <Text style={styles.errorText}>{errors.gender}</Text>
          ) : null}
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                formData.gender === "male" && styles.radioButtonSelected,
              ]}
              onPress={() => setFormData({ ...formData, gender: "male" })}
            >
              <View style={styles.radio}>
                {formData.gender === "male" && (
                  <View style={styles.radioSelected} />
                )}
              </View>
              <Text style={styles.radioLabel}>Homme</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.radioButton,
                formData.gender === "female" && styles.radioButtonSelected,
              ]}
              onPress={() => setFormData({ ...formData, gender: "female" })}
            >
              <View style={styles.radio}>
                {formData.gender === "female" && (
                  <View style={styles.radioSelected} />
                )}
              </View>
              <Text style={styles.radioLabel}>Femme</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          {errors.city ? (
            <Text style={styles.errorText}>{errors.city}</Text>
          ) : null}
          <TextInput
            style={[styles.input, errors.city && styles.inputError]}
            placeholder="Ville"
            placeholderTextColor="#666"
            value={formData.city}
            onChangeText={(text) => setFormData({ ...formData, city: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
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

        <View style={styles.inputContainer}>
          {errors.confirmPassword ? (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          ) : null}
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.inputError]}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="#666"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) =>
              setFormData({ ...formData, confirmPassword: text })
            }
          />
        </View>

        <Pressable
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>S'INSCRIRE</Text>
          )}
        </Pressable>

        <Text style={styles.terms}>
          En vous inscrivant, vous acceptez nos{" "}
          <Text style={styles.link}>Conditions d'utilisation</Text> et notre{" "}
          <Text style={styles.link}>Politique de confidentialité</Text>
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
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E6E1FF",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4A3B8F",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#4A3B8F",
  },
  radioLabel: {
    fontSize: 16,
    color: "#4A3B8F",
  },
});

export default Register;
