import { type TextProps as RNTextProps, TextStyle } from "react-native";
import Animated, { type AnimatedProps } from "react-native-reanimated";
import { forwardRef, ReactNode, useMemo } from "react";

import { useTheme } from "@/src/store";

import {
  type FontFamilyVariant,
  type WeightVariant,
  TEXT_CONFIG,
} from "./config";

type TextProps = AnimatedProps<RNTextProps> & {
  size?: number;
  color?: string;
  children?: ReactNode;
  style?: TextStyle | TextStyle[];

  /**
   * Font weight variants:
   * - light    → 300
   * - regular  → 400
   * - medium   → 500
   * - semiBold → 600
   * - bold     → 700
   * - black    → 800+
   * @default "regular"
   */
  weight?: WeightVariant;

  /**
   * Font family variants:
   * - body      → System fonts (Body text)
   * - primary   → Marcellus (Greek mythology aesthetic)
   * - secondary → SpaceMono (Data and technical information)
   * @default "body"
   */
  family?: FontFamilyVariant;
};

const { fontFamilies, fontWeight, defaults } = TEXT_CONFIG;

const Text = forwardRef<Animated.Text, TextProps>(
  (
    {
      style,
      color,
      children,
      size = defaults.size,
      weight = defaults.weight,
      family = defaults.family,
      ...props
    },
    ref
  ) => {
    /*** Constants ***/
    const { theme } = useTheme();

    /*** Memoization ***/
    const textColor = useMemo(() => {
      if (color) return color;

      return theme.mode === "dark" ? defaults.color.dark : defaults.color.light;
    }, [color, theme.mode]);
    const selectedFamily = useMemo(() => {
      return family ?? defaults.family;
    }, [family]);

    return (
      <Animated.Text
        ref={ref}
        style={[
          {
            fontSize: size,
            color: textColor,
            fontWeight: fontWeight[weight],
            fontFamily: fontFamilies[selectedFamily][weight],
          },
          style,
        ]}
        {...props}
      >
        {children}
      </Animated.Text>
    );
  }
);

Text.displayName = "Text";
export default Text;
