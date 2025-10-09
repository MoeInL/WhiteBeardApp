import { TextStyle } from "react-native";

import { lightColors, darkColors } from "@/src/constants/theme";

/****************** Types ******************/
type FontFamilyType = "primary" | "secondary" | "body";
type ColorVariant = {
  light: string;
  dark: string;
};
type WeightType =
  | "bold"
  | "light"
  | "black"
  | "medium"
  | "regular"
  | "semiBold";

type FontFamilyConfig = Record<WeightType, string>;
type FontWeightConfig = Record<WeightType, TextStyle["fontWeight"]>;

type TextStyleConfig = {
  fontWeight: FontWeightConfig;
  fontFamilies: {
    body: FontFamilyConfig;
    primary: FontFamilyConfig;
    secondary: FontFamilyConfig;
  };
  defaults: {
    size: number;
    weight: WeightType;
    color: ColorVariant;
    family: FontFamilyType;
  };
};

/****************** Configuration ******************/
export const TEXT_CONFIG: TextStyleConfig = {
  /*** Default Values ***/
  defaults: {
    size: 14,
    family: "body",
    weight: "regular",
    color: {
      dark: darkColors.primaryText,
      light: lightColors.primaryText,
    },
  },

  /*** Font Families ***/
  fontFamilies: {
    // Marcellus - Greek mythology aesthetic (titles, hero text)
    primary: {
      bold: "Marcellus-Regular",
      light: "Marcellus-Regular",
      black: "Marcellus-Regular",
      medium: "Marcellus-Regular",
      regular: "Marcellus-Regular",
      semiBold: "Marcellus-Regular",
    },

    // SpaceMono - Data and technical information
    secondary: {
      bold: "SpaceMono-Regular",
      light: "SpaceMono-Regular",
      black: "SpaceMono-Regular",
      medium: "SpaceMono-Regular",
      regular: "SpaceMono-Regular",
      semiBold: "SpaceMono-Regular",
    },

    // System fonts - Body text and descriptions
    body: {
      bold: "System",
      light: "System",
      black: "System",
      medium: "System",
      regular: "System",
      semiBold: "System",
    },
  },

  /*** Font Weights ***/
  fontWeight: {
    bold: "700",
    light: "300",
    black: "800",
    medium: "500",
    regular: "400",
    semiBold: "600",
  },
};

// Type exports for better TypeScript support
export type WeightVariant = WeightType;
export type TextConfigType = TextStyleConfig;
export type FontFamilyVariant = FontFamilyType;
export type { FontFamilyConfig, FontWeightConfig, ColorVariant };
