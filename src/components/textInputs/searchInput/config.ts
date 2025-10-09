import { StyleSheet } from "react-native";

export const searchInputStyles = StyleSheet.create({
  container: {
    gap: 16,
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  icon: {
    flex: 1,
    paddingVertical: 12,
    verticalAlign: "middle",
  },
  input: {
    flex: 1,
    overflow: "hidden",
  },
});

export const searchInputConfig = {
  iconSize: 24,
  minQueryLength: 0,
  placeholder: "Search...",
} as const;
