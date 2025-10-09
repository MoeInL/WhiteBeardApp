import { type RelativePathString, Tabs, router } from "expo-router";

import { Icon } from "@/src/components/base";
import { useTheme } from "@/src/store";

export default function ParentTabsLayout() {
  /*** Constants ***/
  const { theme } = useTheme();

  const handleTabPress = (route: string) => {
    router.navigate(route as RelativePathString);
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background[0],
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondaryText,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "400",
          fontFamily: "Poppins-Regular",
        },
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Icon
              size={size}
              color={color}
              name="compass"
              onPress={() => handleTabPress("explore")}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Icon
              size={size}
              name="heart"
              color={color}
              onPress={() => handleTabPress("favorites")}
            />
          ),
        }}
      />
    </Tabs>
  );
}
