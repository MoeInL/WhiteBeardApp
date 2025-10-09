import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";

import { Text, Icon } from "@/src/components/base";
import { useTheme } from "@/src/store";
import { UniversityType } from "@/src/services/universities/types";

type UniversityPreviewProps = {
  university: UniversityType;
  onPress?: () => void;
};

const UniversityPreview = ({ university, onPress }: UniversityPreviewProps) => {
  /*** Constants ***/
  const { theme } = useTheme();

  const handleOpenWebsite = () => {
    const webPage = university.web_pages?.[0];
    if (webPage) {
      Linking.openURL(
        webPage.startsWith("http") ? webPage : `https://${webPage}`
      );
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.container,
          borderColor: theme.colors.border,
        },
      ]}
    >
      {/* University Icon */}
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: theme.colors.background[1] },
        ]}
      >
        <Icon size={24} name="school" color={theme.colors.primary} />
      </View>

      {/* University Info */}
      <View style={styles.infoContainer}>
        {/* University Name */}
        <Text
          size={16}
          numberOfLines={2}
          weight="semiBold"
          color={theme.colors.primaryText}
        >
          {university.name}
        </Text>

        {/* Country */}
        <View style={styles.row}>
          <Icon
            size={14}
            name="map-marker"
            color={theme.colors.secondaryText}
          />
          <Text
            size={13}
            weight="regular"
            style={styles.countryText}
            color={theme.colors.secondaryText}
          >
            {university.country}
          </Text>
        </View>

        {/* Domain */}
        {university.domains?.[0] && (
          <View style={styles.row}>
            <Icon size={14} name="web" color={theme.colors.accent} />
            <Text
              size={12}
              family="secondary"
              weight="regular"
              numberOfLines={1}
              style={styles.domainText}
              color={theme.colors.accent}
            >
              {university.domains[0]}
            </Text>
          </View>
        )}
      </View>

      {/* Open Website Button */}
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handleOpenWebsite}
        style={styles.websiteButton}
      >
        <Icon size={20} name="open-in-new" color={theme.colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    // Shadow for elevation
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    flex: 1,
    gap: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  countryText: {
    marginTop: 1,
  },
  domainText: {
    marginTop: 1,
  },
  websiteButton: {
    padding: 8,
  },
});

export default UniversityPreview;
