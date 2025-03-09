import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUserStore } from "@/store/userStore";

const SettingsScreen = () => {
  const [notifications, setNotifications] = React.useState(true);
  const [location, setLocation] = React.useState(true);
  const { user }: any = useUserStore();

  const SettingSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const SettingItem = ({
    icon,
    title,
    value,
    onPress,
    hasToggle = false,
  }: {
    icon: string;
    title: string;
    value?: string;
    onPress?: () => void;
    hasToggle?: boolean;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingItemLeft}>
        <Ionicons name={icon as any} size={24} color="#666" />
        <Text style={styles.settingItemTitle}>{title}</Text>
      </View>
      <View style={styles.settingItemRight}>
        {hasToggle ? (
          <Switch value={value === "true"} onValueChange={() => onPress?.()} />
        ) : (
          <>
            <Text style={styles.settingItemValue}>{value}</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <SettingSection title="Compte">
        <SettingItem
          icon="person-outline"
          title="Modifier le profil"
          onPress={() => {}}
        />
        <SettingItem
          icon="shield-outline"
          title="Confidentialité"
          onPress={() => {}}
        />
      </SettingSection>

      <SettingSection title="Notifications">
        <SettingItem
          icon="notifications-outline"
          title="Notifications Push"
          value={notifications ? "true" : "false"}
          hasToggle
          onPress={() => setNotifications(!notifications)}
        />
      </SettingSection>

      <SettingSection title="Découverte">
        <SettingItem
          icon="location-outline"
          title="Localisation"
          value={location ? "true" : "false"}
          hasToggle
          onPress={() => setLocation(!location)}
        />
        <SettingItem
          icon="compass-outline"
          title="Distance maximale"
          value="10 km"
          onPress={() => {}}
        />
        <SettingItem
          icon="people-outline"
          title="Préférences"
          onPress={() => {}}
        />
      </SettingSection>

      <SettingSection title="Aide">
        <SettingItem
          icon="help-circle-outline"
          title="Centre d'aide"
          onPress={() => {}}
        />
        <SettingItem
          icon="document-text-outline"
          title="Conditions d'utilisation"
          onPress={() => {}}
        />
      </SettingSection>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FF",
  },
  section: {
    marginVertical: 12,
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E6E1FF",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A3B8F",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E1FF",
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingItemTitle: {
    fontSize: 16,
    marginLeft: 12,
    color: "#4A3B8F",
  },
  settingItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingItemValue: {
    fontSize: 16,
    color: "#6B4EFF",
    marginRight: 8,
  },
});

export default SettingsScreen;
