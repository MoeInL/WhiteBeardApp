import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";

import { useTheme } from "@/src/store";

import { useAppSafeAreaInsets } from "@/src/hooks";

type BaseHeaderNavigationProps = {
  children: React.ReactNode;
};
const BaseHeaderNavigation = ({ children }: BaseHeaderNavigationProps) => {
  /*** Constants ***/
  const { top } = useAppSafeAreaInsets();

  return (
    <View style={[styles.componentStyle, { paddingTop: top }]}>{children}</View>
  );
};

export { BaseHeaderNavigation };

type HeaderNavigationProps = {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};
const HeaderNavigation = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  showBackButton = true,
}: HeaderNavigationProps) => {
  /*** Constants ***/
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <BaseHeaderNavigation>
      {showBackButton && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.iconContainer}
          onPress={() => router.back()}
        >
          {leftIcon ?? (
            <Feather
              size={32}
              name="chevron-left"
              color={theme.colors.primaryText}
            />
          )}
        </TouchableOpacity>
      )}

      <View style={styles.titleContainer}>
        <Text
          numberOfLines={1}
          style={[styles.title, { color: theme.colors.primaryText }]}
        >
          {title}
        </Text>

        <Text
          numberOfLines={1}
          style={[styles.subtitle, { color: theme.colors.secondaryText }]}
        >
          {subtitle}
        </Text>
      </View>

      <View style={styles.iconContainer}>{rightIcon}</View>
    </BaseHeaderNavigation>
  );
};

export default HeaderNavigation;

const styles = StyleSheet.create({
  componentStyle: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    gap: 8,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Marcellus-Regular",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "SpaceMono-Regular",
  },
});
