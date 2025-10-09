import { View, StyleSheet, TouchableOpacity } from "react-native";

import { type UniversityType } from "@/src/services";

import { useHandleFavorites } from "@/src/hooks";

import { AnimatedContainer } from "@/src/components/animations";
import { Text, Icon } from "@/src/components/base";
import { useTheme } from "@/src/store";

type UniversityPreviewProps = {
  index: number;
  onPress: () => void;
  university: UniversityType;
};

const UniversityPreview = ({
  university,
  onPress,
  index,
}: UniversityPreviewProps) => {
  /*** Constants ***/
  const { theme } = useTheme();
  const { isInFavorites, handleToggleFavorite } =
    useHandleFavorites(university);

  /*** Handlers ***/
  const handleFavoritePress = () => {
    handleToggleFavorite();
  };

  return (
    <AnimatedContainer
      onPress={onPress}
      activeOpacity={0.8}
      delay={index * 100}
      animatedStyle="slideLeft"
      style={[
        styles.container,
        {
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.container,
        },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: theme.colors.background[1] },
        ]}
      >
        <Icon size={24} name="school" color={theme.colors.primary} />
      </View>

      <View style={styles.infoContainer}>
        <Text
          size={16}
          numberOfLines={2}
          weight="semiBold"
          color={theme.colors.primaryText}
        >
          {university.name}
        </Text>

        <View style={styles.row}>
          <Icon
            size={14}
            name="map-marker"
            color={theme.colors.secondaryText}
          />

          <Text size={13} weight="regular" color={theme.colors.secondaryText}>
            {university.country}
          </Text>
        </View>

        {university.domains?.[0] && (
          <View style={styles.row}>
            <Icon size={14} name="web" color={theme.colors.accent} />

            <Text
              size={12}
              family="secondary"
              weight="regular"
              numberOfLines={1}
              color={theme.colors.accent}
            >
              {university.domains[0]}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.iconButton}
          onPress={handleFavoritePress}
        >
          {isInFavorites ? (
            <Icon size={24} name="heart" color={theme.colors.error} />
          ) : (
            <Icon size={24} name="heart-outline" color={theme.colors.error} />
          )}
        </TouchableOpacity>

        <Icon size={20} name="open-in-new" color={theme.colors.primary} />
      </View>
    </AnimatedContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    height: 100,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,

    // IOS Shadows
    shadowRadius: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    // Android Shadows
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
    gap: 4,
    flex: 1,
  },
  row: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  actionsContainer: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 4,
  },
});

export default UniversityPreview;
