import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import {
  useWindowDimensions,
  type ColorValue,
  StyleSheet,
  View,
} from "react-native";

import { useTheme } from "@/src/store";

import { Palette } from "@/src/constants/theme";

import Icon, { type IconType } from "@/src/components/base/icon";
import { Text } from "@/src/components/base";

export type ToastType = "success" | "error" | "info" | "warning";
export type CustomToastProps = {
  type: ToastType;
  message: string;
  duration?: number;
  onPress?: () => void;
  showProgress?: boolean;
};

type ToastConfig = {
  title: string;
  icon: IconType;
  colorKey: keyof Palette;
};
const getToastConfig: (type: ToastType) => ToastConfig = (type: ToastType) => {
  switch (type) {
    case "success":
      return {
        title: "Success!",
        icon: "check-circle",
        colorKey: "success",
      };
    case "error":
      return {
        title: "Oh no!",
        colorKey: "error",
        icon: "close-circle",
      };
    case "warning":
      return {
        title: "Warning!",
        colorKey: "warning",
        icon: "alert-circle",
      };
    case "info":
      return {
        title: "Info",
        icon: "information",
        colorKey: "primary",
      };
    default:
      return {
        title: "Success!",
        colorKey: "success",
        icon: "check-circle",
      };
  }
};

export const CustomToast = ({
  type,
  message,
  onPress,
  duration = 4000,
  showProgress = true,
}: CustomToastProps) => {
  /*** Constants ***/
  const { theme } = useTheme();
  const { top } = useSafeAreaInsets();
  const config = getToastConfig(type);
  const { width: screenWidth } = useWindowDimensions();

  /*** Animations ***/
  const progressWidth = useSharedValue(100);
  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  useEffect(() => {
    if (showProgress) {
      progressWidth.value = withTiming(0, {
        duration,
        easing: Easing.linear,
      });
    }
  }, [showProgress, duration, progressWidth]);

  return (
    <View
      style={[
        styles.container,
        {
          marginTop: top / 2,
          width: screenWidth - 32,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors[config.colorKey] as ColorValue,
        },
      ]}
    >
      <View style={styles.mainContent}>
        <Icon size={24} name={config.icon} color="#ffffff" />

        <View style={styles.textContainer}>
          <Text
            size={16}
            color="#ffffff"
            weight="semiBold"
            family="primary"
            style={styles.title}
          >
            {config.title}
          </Text>

          <Text
            size={14}
            family="body"
            weight="regular"
            style={styles.subtitle}
            color="rgba(255, 255, 255, 0.9)"
          >
            {message}
          </Text>
        </View>

        <Icon
          size={20}
          onPress={onPress}
          name="close-outline"
          color="rgba(255, 255, 255, 0.8)"
        />
      </View>

      {showProgress && (
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressBar, progressAnimatedStyle]} />
        </View>
      )}
    </View>
  );
};

export default CustomToast;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 16,
    marginVertical: 8,
    overflow: "hidden",
    marginHorizontal: 16,

    // IOS Shadows
    shadowRadius: 16,
    shadowOpacity: 0.25,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },

    // Android Shadows
    elevation: 16,
  },
  mainContent: {
    gap: 12,
    paddingVertical: 18,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    lineHeight: 20,
    marginBottom: 4,
    textTransform: "capitalize",
  },
  subtitle: {
    opacity: 0.95,
    lineHeight: 20,
  },
  progressTrack: {
    height: 3,
    marginTop: 8,
    marginBottom: 6,
    borderRadius: 1.5,
    marginHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  progressBar: {
    height: "100%",
    borderRadius: 1.5,
    backgroundColor: "rgba(255, 255, 255, 0.98)",

    // IOS shadows
    shadowRadius: 16,
    shadowOpacity: 0.25,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },

    // Android shadows
    elevation: 16,
  },
});
