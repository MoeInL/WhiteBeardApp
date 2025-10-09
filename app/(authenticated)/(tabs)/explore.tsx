import Animated, { LinearTransition } from "react-native-reanimated";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Toast } from "toastify-react-native";
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

import { HeaderNavigation, Text, Icon, DropDown } from "@/src/components/base";
import { SearchInput } from "@/src/components/textInputs";
import {
  UniversityPreviewSkeleton,
  UniversityPreview,
} from "@/src/components/preview";

const Explore = () => {
  /*** States ***/
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [country, setCountry] = useState<string | undefined>(undefined);

  /*** Constants ***/
  const { theme } = useTheme();
  const { bottom } = useAppSafeAreaInsets();
  const {
    data,
    error,
    refetch,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = UniversityService.useGetUniversities({ name: search, country });

  useEffect(() => {
    if (error) {
      Toast.error(error.message);
    }
  }, [error]);

  /***** Memoization *****/
  const countries = useMemo(() => {
    if (!data) return [];

    const uniqueCountries = Array.from(
      new Set(data.map((item) => item.country))
    ).sort();

    return uniqueCountries.map((country) => ({
      label: country,
      value: country,
    }));
  }, [data]);

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

      <Animated.View style={styles.searchContainer} layout={LinearTransition}>
        <SearchInput
          onSearch={(text) => setSearch(text)}
          placeholder="Search universities..."
          onClear={() => {
            setSearch("");
            setCountry(undefined);
          }}
        />

        <DropDown
          items={countries || []}
          placeholder="Select a country"
          disabled={countries.length === 0}
          onSelect={(item) => setCountry(item.value)}
        />
      </Animated.View>

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
        contentContainerStyle={[styles.container, { paddingBottom: bottom }]}
      />
    </LinearGradient>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    gap: 12,
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    gap: 16,
    zIndex: 1000,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
