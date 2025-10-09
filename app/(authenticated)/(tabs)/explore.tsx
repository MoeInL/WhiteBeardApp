import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import {
  RefreshControl,
  StyleSheet,
  FlatList,
  Linking,
  View,
} from "react-native";

import { UniversityService, type UniversityType } from "@/src/services";
import { useTheme } from "@/src/store";

import { useAppSafeAreaInsets } from "@/src/hooks";

import { HeaderNavigation, Text, Icon } from "@/src/components/base";
import { SearchInput } from "@/src/components/textInputs";
import {
  UniversityPreviewSkeleton,
  UniversityPreview,
} from "@/src/components/preview";

const Explore = () => {
  /*** States ***/
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  /*** Constants ***/
  const { theme } = useTheme();
  const { bottom } = useAppSafeAreaInsets();
  const {
    data,
    refetch,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = UniversityService.useGetUniversities(search);

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: 100,
      offset: 100 * index,
      index,
    }),
    []
  );
  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  const handleRefresh = useCallback(() => {
    if (search.length === 0) {
      return;
    }

    refetch().finally(() => {
      setRefreshing(false);
    });
  }, [refetch, search]);

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
  const RenderFooterComponent = useCallback(() => {
    if (isFetchingNextPage) {
      return (
        <View style={{ paddingVertical: 16 }}>
          <UniversityPreviewSkeleton />
        </View>
      );
    }

    return null;
  }, [isFetchingNextPage]);
  const RenderEmptyComponent = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, index) => (
        <UniversityPreviewSkeleton key={index} />
      ));
    }

    if (data?.length === 0 && search.length > 0) {
      return (
        <View style={styles.emptyContainer}>
          <Icon
            size={64}
            name="school-outline"
            style={{ opacity: 0.5 }}
            color={theme.colors.secondaryText}
          />
          <Text
            size={18}
            weight="semiBold"
            style={{ marginTop: 16 }}
            color={theme.colors.primaryText}
          >
            No universities found
          </Text>
          <Text
            size={14}
            weight="regular"
            style={{ marginTop: 8, textAlign: "center" }}
            color={theme.colors.secondaryText}
          >
            Try adjusting your search terms
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Icon
          size={64}
          name="magnify"
          color={theme.colors.primary}
          style={{ opacity: 0.8 }}
        />
        <Text
          size={18}
          weight="semiBold"
          style={{ marginTop: 16 }}
          color={theme.colors.primaryText}
        >
          Search for a university
        </Text>
        <Text
          size={14}
          weight="regular"
          style={{ marginTop: 8, textAlign: "center", paddingHorizontal: 32 }}
          color={theme.colors.secondaryText}
        >
          Enter a university name or country to start exploring
        </Text>
      </View>
    );
  }, [data, isLoading, search, theme]);
  const RenderRefreshControl = useCallback(() => {
    return (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={handleRefresh}
        colors={[theme.colors.primary]}
        tintColor={theme.colors.primary}
      />
    );
  }, [refreshing, handleRefresh, theme]);

  return (
    <LinearGradient style={{ flex: 1 }} colors={theme.colors.background}>
      <HeaderNavigation
        showBackButton={false}
        title="Explore Universities"
        subtitle="Discover universities from around the world"
      />

      <View style={styles.container}>
        <SearchInput
          onSearch={(text) => setSearch(text)}
          placeholder="Search universities by name or country..."
        />

        <FlatList
          data={data || []}
          renderItem={RenderItem}
          onEndReachedThreshold={0.5}
          getItemLayout={getItemLayout}
          onEndReached={handleLoadMore}
          showsVerticalScrollIndicator={false}
          refreshControl={RenderRefreshControl()}
          ListEmptyComponent={RenderEmptyComponent}
          ListFooterComponent={RenderFooterComponent}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          contentContainerStyle={[
            styles.listContainer,
            { paddingBottom: bottom },
          ]}
        />
      </View>
    </LinearGradient>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    paddingHorizontal: 16,
  },
  listContainer: {
    gap: 12,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
