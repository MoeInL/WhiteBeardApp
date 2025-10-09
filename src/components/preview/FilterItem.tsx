import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolateColor,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import React, { useEffect } from "react";

import { useTheme } from "@/src/store";

export type FilterItemType = {
  label: string;
  value: string;
};
type FilterItemProps = {
  isSelected: boolean;
  data: FilterItemType;
  onPress: (data: FilterItemType) => void;
};

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const FilterItem = ({ isSelected, data, onPress }: FilterItemProps) => {
  /*** Constants ***/
  const { theme } = useTheme();

  /*** Animations ***/
  const selectionAnimation = useSharedValue(isSelected ? 1 : 0);
  const animatedContainerStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      selectionAnimation.value,
      [0, 1],
      [theme.colors.border, theme.colors.primary]
    );

    const backgroundColor = interpolateColor(
      selectionAnimation.value,
      [0, 1],
      [theme.colors.container, theme.colors.primary + "15"]
    );

    return {
      borderColor,
      backgroundColor,
    };
  });
  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      selectionAnimation.value,
      [0, 1],
      [theme.colors.secondaryText, theme.colors.primary]
    );

    return {
      color,
    };
  });

  useEffect(() => {
    selectionAnimation.value = withTiming(isSelected ? 1 : 0, {
      duration: 200,
    });
  }, [isSelected, selectionAnimation]);

  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(data)}
      style={[styles.container, animatedContainerStyle]}
    >
      <Animated.Text style={[styles.text, animatedTextStyle]}>
        {data.label}
      </Animated.Text>
    </AnimatedTouchableOpacity>
  );
};

export default FilterItem;

const styles = StyleSheet.create({
  container: {
    height: 30,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "medium",
  },
});
