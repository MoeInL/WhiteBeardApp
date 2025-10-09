import { StyleSheet } from "react-native";

export const searchInputStyles = StyleSheet.create({
  container: {
    gap: 16,
    height: 48,
    flexShrink: 1,
    borderWidth: 1,
    borderRadius: 16,
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  icon: {
    flex: 1,
    paddingVertical: 12,
    verticalAlign: "middle",
  },
  input: {
    flexGrow: 1,
  },
});

export const searchInputConfig = {
  iconSize: 24,
  minQueryLength: 0,
  placeholder: "Search...",
} as const;
