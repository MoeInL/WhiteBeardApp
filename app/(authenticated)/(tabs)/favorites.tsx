import { StyleSheet, FlatList, Linking, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback } from "react";

import { useTheme, useUserProvider } from "@/src/store";
import { type UniversityType } from "@/src/services";

import { useAppSafeAreaInsets } from "@/src/hooks";

import { HeaderNavigation, Text, Icon } from "@/src/components/base";
import { UniversityPreview } from "@/src/components/preview";

const Favorites = () => {
  /*** Constants ***/
  const { theme } = useTheme();
  const { favorites } = useUserProvider();
  const { bottom } = useAppSafeAreaInsets();

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: 100,
      offset: 100 * index,
      index,
    }),
    []
  );

  const RenderItem = useCallback(
    ({ item, index }: { item: UniversityType; index: number }) => {
      const handleOpenWebsite = () => {
        const webPage = item.web_pages?.[0];
        if (webPage) {
          Linking.openURL(
            webPage.startsWith("http") ? webPage : `https://${webPage}`
          );
        }
      };

      return (
        <UniversityPreview
          index={index}
          university={item}
          onPress={handleOpenWebsite}
        />
      );
    },
    []
  );
  const RenderEmptyComponent = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <Icon
          size={64}
          name="heart-outline"
          color={theme.colors.error}
          style={{ opacity: 0.6 }}
        />

        <Text
          size={18}
          weight="semiBold"
          style={{ marginTop: 16 }}
          color={theme.colors.primaryText}
        >
          No favorites yet
        </Text>

        <Text
          size={14}
          weight="regular"
          style={{ marginTop: 8, textAlign: "center", paddingHorizontal: 32 }}
          color={theme.colors.secondaryText}
        >
          Start exploring universities and tap the heart icon to save your
          favorites
        </Text>
      </View>
    );
  }, [theme]);

  return (
    <LinearGradient style={{ flex: 1 }} colors={theme.colors.background}>
      <HeaderNavigation
        showBackButton={false}
        title="Favorite Universities"
        subtitle="Your saved universities in one place"
      />

      <FlatList
        data={favorites || []}
        renderItem={RenderItem}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={RenderEmptyComponent}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        contentContainerStyle={[styles.container, { paddingBottom: bottom }]}
      />
    </LinearGradient>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 12,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
