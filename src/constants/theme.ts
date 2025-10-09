import { ColorValue } from "react-native";

/****************** Types ******************/
export type ThemeMode = "light" | "dark";
export type Palette = {
  // Core backgrounds
  container: string;
  background: [ColorValue, ColorValue, ColorValue];

  // Text colors
  primaryText: string;
  secondaryText: string;

  // Brand colors - AURUM GOLD theme
  primary: string; // Main gold
  secondary: string; // Bronze gold

  // UI elements
  border: string;

  // Semantic colors
  error: string; // Terracotta red
  accent: string; // Ancient bronze
  success: string; // Olive branch green
  warning: string; // Amber
};
export type Theme = {
  mode: ThemeMode;
  colors: Palette;
};

/****************** Greek Mythology Color Palettes ******************/
export const lightColors: Palette = {
  // Marble white
  container: "#F7F5F2",
  background: ["#F8F6F4", "#F2F0EB", "#E8E4DE"],

  // Deep charcoal
  primaryText: "#1C1B1A",
  secondaryText: "#6B6A67",

  // Pure golden yellow
  primary: "#E6AC00",

  // Ancient Greek bronze
  secondary: "#B87333",

  // Marble veining
  border: "#D4D0C8",

  // Additional Greek colors
  error: "#C54B3A",
  accent: "#B8860B",
  warning: "#F4A261",
  success: "#6B8E23",
};
export const darkColors: Palette = {
  // Deep night sky
  container: "#141416",
  background: ["#0A0A0B", "#141416", "#2A2A2C"],

  // Moonlight on marble
  primaryText: "#F5F4F1",
  secondaryText: "#B5B3AE",

  // Pure golden yellow
  primary: "#FFB300",

  // Ancient Greek bronze
  secondary: "#CD853F",

  // Dark marble veining
  border: "#2A2A2C",

  // Additional Greek colors (dark variants)
  error: "#E74C3C",
  accent: "#DAA520",
  success: "#808000",
  warning: "#FFA726",
};

/****************** Theme Objects ******************/
export const lightTheme: Theme = {
  mode: "light",
  colors: lightColors,
};

export const darkTheme: Theme = {
  mode: "dark",
  colors: darkColors,
};

/****************** Theme Utilities ******************/
export const getTheme = (mode: ThemeMode): Theme => {
  return mode === "light" ? lightTheme : darkTheme;
};

export type { Theme as ThemeType, Palette as PaletteType };
