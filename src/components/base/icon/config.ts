import { ViewStyle } from "react-native";

import { lightColors, darkColors } from "@/src/constants/theme";

/****************** Types ******************/
type BackgroundStyle = Pick<
  ViewStyle,
  "width" | "height" | "borderWidth" | "borderRadius"
>;

type AnimationConfig = {
  duration: number;
};

type ColorVariant = {
  dark: string;
  light: string;
};

type IconStyleConfig = {
  background: BackgroundStyle;
  defaults: {
    size: number;
    hitSlop: number;
    color: ColorVariant;
    activeOpacity: number;
  };
  animation: {
    fill: AnimationConfig;
    sequence: AnimationConfig;
  };
  loading: {
    backgroundOpacity: number;
  };
  backgroundColors: {
    border: ColorVariant;
    container: ColorVariant;
  };
};

/****************** Configuration ******************/
export const ICON_CONFIG: IconStyleConfig = {
  /*** Default Values ***/
  defaults: {
    size: 24,
    hitSlop: 10,
    activeOpacity: 0.7,
    color: {
      dark: darkColors.primaryText,
      light: lightColors.primaryText,
    },
  },

  /*** Background Style ***/
  background: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
  },

  /*** Animation Settings ***/
  animation: {
    fill: {
      duration: 1200,
    },
    sequence: {
      duration: 800,
    },
  },

  /*** Loading State ***/
  loading: {
    backgroundOpacity: 0.3,
  },

  /*** Background Colors ***/
  backgroundColors: {
    border: {
      dark: darkColors.border,
      light: lightColors.border,
    },
    container: {
      dark: darkColors.container,
      light: lightColors.container,
    },
  },
};

// Type exports for better TypeScript support
export type IconConfigType = IconStyleConfig;
export type { BackgroundStyle, AnimationConfig, ColorVariant };
