import { TextStyle, ViewStyle } from "react-native";

import { lightColors, darkColors } from "@/src/constants/theme";

/****************** Types ******************/
type ButtonLayoutStyle = Pick<ViewStyle, "height" | "borderRadius">;
type LabelStyle = Pick<TextStyle, "fontSize" | "fontWeight" | "letterSpacing">;

type ColorVariant = {
  dark: string;
  light: string;
};
type ButtonColorVariant = {
  textColor: ColorVariant;
  borderColor?: ColorVariant;
  backgroundColor: ColorVariant;
};
type ButtonStyles = {
  labelStyle: LabelStyle;
  buttonLayout: ButtonLayoutStyle;
  defaults: {
    activeOpacity: number;
    borderWidth: {
      error: number;
      outline: number;
    };
  };
  variants: {
    primary: ButtonColorVariant;
    outline: ButtonColorVariant;
    secondary: ButtonColorVariant;
    ghost: Pick<ButtonColorVariant, "textColor" | "backgroundColor">;
  };
  errorText: {
    textColor: ColorVariant;
    borderColor: ColorVariant;
  };
};

/****************** Configuration ******************/
export const BUTTON_STYLES: ButtonStyles = {
  /*** Layout & Dimensions ***/
  buttonLayout: {
    height: 52,
    borderRadius: 16,
  },

  /*** Typography ***/
  labelStyle: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.8,
  },

  /*** Interaction Defaults ***/
  defaults: {
    activeOpacity: 0.8,
    borderWidth: {
      error: 2,
      outline: 2,
    },
  },

  /*** Greek Mythology Button Variants ***/
  variants: {
    // AURUM GOLD - Main actions
    primary: {
      textColor: {
        dark: "#FFFFFF",
        light: "#FFFFFF",
      },
      backgroundColor: {
        dark: darkColors.primary,
        light: lightColors.primary,
      },
      borderColor: {
        dark: darkColors.primary,
        light: lightColors.primary,
      },
    },

    // BRONZE GOLD - Secondary actions
    secondary: {
      textColor: {
        dark: "#FFFFFF",
        light: "#FFFFFF",
      },
      backgroundColor: {
        dark: darkColors.secondary,
        light: lightColors.secondary,
      },
      borderColor: {
        dark: darkColors.secondary,
        light: lightColors.secondary,
      },
    },

    // GHOST - Transparent with colored text
    ghost: {
      textColor: {
        dark: darkColors.primary,
        light: lightColors.primary,
      },
      backgroundColor: {
        light: "transparent",
        dark: "transparent",
      },
    },

    // OUTLINE - Transparent with colored border
    outline: {
      textColor: {
        dark: darkColors.primary,
        light: lightColors.primary,
      },
      backgroundColor: {
        dark: "transparent",
        light: "transparent",
      },
      borderColor: {
        dark: darkColors.primary,
        light: lightColors.primary,
      },
    },
  },

  /*** Error State ***/
  errorText: {
    textColor: {
      dark: darkColors.error,
      light: lightColors.error,
    },
    borderColor: {
      dark: darkColors.error,
      light: lightColors.error,
    },
  },
};

// Type exports for better TypeScript support
export type ButtonStylesType = ButtonStyles;
export type ButtonVariant = keyof ButtonStyles["variants"];
export type { ButtonLayoutStyle, LabelStyle, ColorVariant, ButtonColorVariant };
