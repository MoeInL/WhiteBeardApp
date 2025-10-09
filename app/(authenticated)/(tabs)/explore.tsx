import { LinearGradient } from "expo-linear-gradient";
import { FlatList, StyleSheet } from "react-native";

import { UniversityService, type UniversityType } from "@/src/services";
import { useTheme } from "@/src/store";

import { useAppSafeAreaInsets } from "@/src/hooks";

import { UniversityPreview } from "@/src/components/preview";
import { SearchInput } from "@/src/components/textInputs";
import { HeaderNavigation } from "@/src/components/base";
import { useCallback } from "react";

const Explore = () => {
  /*** Constants ***/
  const { theme } = useTheme();
  const { bottom } = useAppSafeAreaInsets();
  const { data, isLoading } = UniversityService.useGetUniversities("middle");

  const RenderItem = useCallback(
    ({ item }: { item: UniversityType }) => (
      <UniversityPreview university={item} />
    ),
    []
  );
  const RenderHeaderComponent = useCallback(
    () => <SearchInput onSearch={() => {}} placeholder="Search universities" />,
    []
  );

  return (
    <LinearGradient
      colors={theme.colors.background}
      style={{ flex: 1, paddingBottom: bottom }}
    >
      <HeaderNavigation
        showBackButton={false}
        title="Explore Universities"
        subtitle="Discover universities from around the world"
      />

      <FlatList
        data={data || []}
        renderItem={RenderItem}
        ListHeaderComponent={RenderHeaderComponent}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        contentContainerStyle={[styles.container, { paddingBottom: bottom }]}
      />
    </LinearGradient>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    gap: 24,
    flexGrow: 1,
    paddingHorizontal: 16,
  },
});
