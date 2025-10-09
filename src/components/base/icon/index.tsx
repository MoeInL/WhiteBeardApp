import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useMemo } from "react";
import Animated, {
  useAnimatedStyle,
  cancelAnimation,
  useSharedValue,
  withSequence,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import {
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TextStyle,
  View,
} from "react-native";

import { useTheme } from "@/src/store";

import { ICON_CONFIG } from "./config";

export type IconType = keyof typeof MaterialCommunityIcons.glyphMap;

type IconProps = TouchableOpacityProps & {
  size?: number;
  color?: string;
  name: IconType;
  loading?: boolean;
  onPress?: () => void;
  hasBackground?: boolean;
  style?: StyleProp<TextStyle>;
};

const {
  defaults,
  animation,
  background,
  backgroundColors,
  loading: loadingConfig,
} = ICON_CONFIG;

const Icon = ({
  name,
  style,
  color,
  onPress,
  loading = false,
  size = defaults.size,
  hasBackground = false,
  ...props
}: IconProps) => {
  /*** Constants ***/
  const { theme } = useTheme();
  const { hitSlop, activeOpacity, color: defaultColor } = defaults;

  /*** Memoization ***/
  const iconColor = useMemo(() => {
    if (color) return color;

    return theme.mode === "dark" ? defaultColor.dark : defaultColor.light;
  }, [color, theme.mode, defaultColor]);
  const backgroundStyle = useMemo(() => {
    if (!hasBackground) return {};
    const { border, container } = backgroundColors;

    const borderColor = theme.mode === "dark" ? border.dark : border.light;
    const backgroundColor =
      theme.mode === "dark" ? container.dark : container.light;

    return {
      ...styles.hasBackground,
      borderColor,
      backgroundColor,
    };
  }, [hasBackground, theme.mode]);

  /***** Animations *****/
  const fill = useSharedValue(0);
  const shouldStop = useSharedValue(false);
  const animatedStyle = useAnimatedStyle(() => ({
    height: fill.value * size,
  }));

  useEffect(() => {
    if (loading) {
      shouldStop.value = false;

      const startAnimation = () => {
        fill.value = withRepeat(
          withSequence(
            withTiming(1, { duration: animation.fill.duration }),
            withTiming(
              0,
              { duration: animation.sequence.duration },
              (finished) => {
                "worklet";
                if (finished && shouldStop.value) {
                  cancelAnimation(fill);
                  fill.value = 0;
                }
              }
            )
          ),
          -1,
          false
        );
      };

      startAnimation();
    } else {
      shouldStop.value = true;
    }
  }, [fill, loading, shouldStop, size]);

  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={hitSlop}
      disabled={!onPress}
      activeOpacity={activeOpacity}
      style={[hasBackground && backgroundStyle]}
      {...props}
    >
      {loading ? (
        <View style={{ width: size, height: size, position: "relative" }}>
          <MaterialCommunityIcons
            size={size}
            name={name}
            style={style}
            color={`${iconColor}${Math.round(
              loadingConfig.backgroundOpacity * 255
            )
              .toString(16)
              .padStart(2, "0")}`}
          />

          <Animated.View
            style={[
              {
                bottom: 0,
                width: size,
                overflow: "hidden",
                position: "absolute",
              },
              animatedStyle,
            ]}
          >
            <View
              style={{
                bottom: 0,
                width: size,
                height: size,
                position: "absolute",
              }}
            >
              <MaterialCommunityIcons
                size={size}
                name={name}
                color={iconColor}
              />
            </View>
          </Animated.View>
        </View>
      ) : (
        <MaterialCommunityIcons
          size={size}
          name={name}
          style={style}
          color={iconColor}
        />
      )}
    </TouchableOpacity>
  );
};

export default Icon;

const styles = StyleSheet.create({
  hasBackground: {
    alignItems: "center",
    width: background.width,
    justifyContent: "center",
    height: background.height,
    borderWidth: background.borderWidth,
    borderRadius: background.borderRadius,
  },
});
