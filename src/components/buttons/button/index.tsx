import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import React, { useMemo } from "react";
import {
  TouchableOpacity,
  type ViewStyle,
  type StyleProp,
  StyleSheet,
  View,
} from "react-native";

import { useTheme } from "@/src/store";

import { BUTTON_STYLES, type ButtonVariant } from "./config";
import { Icon, type IconType, Text } from "../../base";
import LoadingDots from "./LoadingDots";

type ButtonProps = {
  title: string;
  error?: string;
  color?: string;
  disabled?: boolean;
  onPress: () => void;
  isLoading?: boolean;
  leadingIcon?: IconType;
  variant?: ButtonVariant;
  trailingIcon?: IconType;
  width?: ViewStyle["width"];
  containerStyle?: ViewStyle;
};

const Button = ({
  title,
  error,
  width,
  color,
  onPress,
  disabled,
  isLoading,
  leadingIcon,
  trailingIcon,
  containerStyle,
  variant = "primary",
}: ButtonProps) => {
  /*** Constants ***/
  const { theme } = useTheme();
  const {
    variants,
    defaults,
    labelStyle,
    buttonLayout,
    errorText: errorStyles,
  } = BUTTON_STYLES;
  const variantStyles = variants[variant];

  /*** Memoization ***/
  const textColor = useMemo(() => {
    return theme.mode === "dark"
      ? variantStyles.textColor.dark
      : variantStyles.textColor.light;
  }, [variantStyles, theme.mode]);
  const backgroundColor = useMemo(() => {
    return theme.mode === "dark"
      ? variantStyles.backgroundColor.dark
      : variantStyles.backgroundColor.light;
  }, [variantStyles, theme.mode]);
  const borderColor = useMemo(() => {
    if (!("borderColor" in variantStyles) || !variantStyles.borderColor) {
      return undefined;
    }

    return theme.mode === "dark"
      ? variantStyles.borderColor.dark
      : variantStyles.borderColor.light;
  }, [variantStyles, theme.mode]);
  const errorTextColor = useMemo(() => {
    return theme.mode === "dark"
      ? errorStyles.textColor.dark
      : errorStyles.textColor.light;
  }, [errorStyles, theme.mode]);
  const errorBorderColor = useMemo(() => {
    return theme.mode === "dark"
      ? errorStyles.borderColor.dark
      : errorStyles.borderColor.light;
  }, [errorStyles, theme.mode]);
  const buttonLayoutStyles: StyleProp<ViewStyle> = useMemo(
    () => [
      styles.base,
      {
        gap: 8,
        backgroundColor,
        opacity: disabled ? 0.5 : 1,
        height: buttonLayout.height,
        borderRadius: buttonLayout.borderRadius,
        justifyContent: isLoading ? "center" : "space-between",
      },
    ],
    [backgroundColor, buttonLayout, disabled, isLoading]
  );
  const buttonBorderStyles: StyleProp<ViewStyle> = useMemo(() => {
    if (variant === "outline" && borderColor) {
      return {
        borderColor,
        borderWidth: defaults.borderWidth.outline,
      };
    }

    if (error) {
      return {
        borderColor: errorBorderColor,
        borderWidth: defaults.borderWidth.error,
      };
    }

    return {};
  }, [variant, error, borderColor, errorBorderColor, defaults]);

  return (
    <View style={[containerStyle, { width }]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || isLoading}
        activeOpacity={defaults.activeOpacity}
        style={[buttonLayoutStyles, buttonBorderStyles]}
      >
        {isLoading ? (
          <LoadingDots
            size={8}
            numberOfDots={4}
            color={textColor}
            style={{ alignSelf: "center" }}
          />
        ) : (
          <>
            <View>
              {leadingIcon && (
                <Icon size={20} color={textColor} name={leadingIcon} />
              )}
            </View>

            <Text
              weight="semiBold"
              color={color || textColor}
              size={labelStyle.fontSize}
              style={{
                textAlign: "center",
                letterSpacing: labelStyle.letterSpacing,
                textDecorationLine: variant === "ghost" ? "underline" : "none",
              }}
            >
              {title}
            </Text>

            <View>
              {trailingIcon && (
                <Icon size={20} color={textColor} name={trailingIcon} />
              )}
            </View>
          </>
        )}
      </TouchableOpacity>

      {error && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        >
          <Text
            size={12}
            weight="regular"
            color={errorTextColor}
            style={styles.errorText}
          >
            {error}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 3,
    marginLeft: 10,
    fontWeight: "400",
  },
});
