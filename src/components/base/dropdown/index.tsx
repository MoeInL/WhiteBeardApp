import { useMemo, useState, useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  SlideOutRight,
  interpolate,
  Extrapolate,
  SlideInRight,
  withTiming,
} from "react-native-reanimated";
import {
  TouchableOpacity,
  type ViewStyle,
  StyleSheet,
  View,
} from "react-native";

import { useTheme } from "@/src/store";

import DropdownItem from "./item";
import Text from "../text";
import Icon from "../icon";

export type DropDownItem<T = any> = {
  label: string;
  value: T;
};

type DropDownProps = {
  disabled?: boolean;
  placeholder?: string;
  items: DropDownItem[];
  selectedValue?: any;
  width?: ViewStyle["width"];
  containerHeight?: ViewStyle["height"];
  onSelect: (item: DropDownItem) => void;
};

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const DropDown = ({
  items,
  width,
  onSelect,
  selectedValue,
  disabled = false,
  containerHeight = 36,
  placeholder = "Select an option",
}: DropDownProps) => {
  /***** Constants *****/
  const { theme } = useTheme();

  /***** States *****/
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropDownItem | null>(null);

  useEffect(() => {
    if (items.length === 0 || !selectedValue) {
      setSelectedItem(null);
      return;
    }

    if (selectedValue !== undefined && selectedValue !== null) {
      const found = items.find((item) => {
        if (typeof item.value === "object" && item.value !== null) {
          if (typeof selectedValue === "object" && selectedValue !== null) {
            return JSON.stringify(item.value) === JSON.stringify(selectedValue);
          }
          return false;
        }
        return item.value === selectedValue;
      });

      setSelectedItem(found || null);
    }
  }, [selectedValue, items]);

  /***** Memoization *****/
  const placeHolderColor = useMemo(
    () =>
      selectedItem ? theme.colors.primaryText : theme.colors.secondaryText,
    [selectedItem, theme]
  );

  /***** Animation *****/
  const height = useSharedValue(0);
  const rotation = useSharedValue(0);
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      opacity: interpolate(height.value, [0, 50], [0, 1], Extrapolate.CLAMP),
    };
  });
  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const toggleDropdown = () => {
    if (disabled) return;

    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    height.value = withTiming(newIsOpen ? items.length * 50 + 16 : 0, {
      duration: 300,
    });

    rotation.value = withTiming(newIsOpen ? 180 : 0, {
      duration: 300,
    });
  };
  const handleItemSelect = (item: DropDownItem) => {
    setSelectedItem(item);
    onSelect(item);
    toggleDropdown();
  };

  return (
    <Animated.View
      style={[styles.container, { width: width }]}
      entering={SlideInRight}
      exiting={SlideOutRight}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={disabled}
        onPress={toggleDropdown}
        style={[
          styles.trigger,
          {
            height: containerHeight,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.container,
          },
          disabled && {
            opacity: 0.5,
            backgroundColor: String(theme.colors.background[1]),
          },
        ]}
      >
        <Text color={placeHolderColor} size={14}>
          {selectedItem?.label || placeholder}
        </Text>

        <AnimatedIcon
          size={20}
          name="chevron-down"
          style={animatedIconStyle}
          color={
            disabled ? theme.colors.secondaryText : theme.colors.primaryText
          }
        />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.dropdown,
          animatedContainerStyle,
          {
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.container,
          },
        ]}
      >
        {items.map((item, index) => (
          <View key={index}>
            <DropdownItem
              item={item}
              handleItemSelect={handleItemSelect}
              selectedValue={selectedValue ?? ""}
            />

            {index !== items.length - 1 && (
              <View
                style={[
                  styles.divider,
                  { backgroundColor: theme.colors.border },
                ]}
              />
            )}
          </View>
        ))}
      </Animated.View>
    </Animated.View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    minWidth: 160,
    position: "relative",
  },
  trigger: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  dropdown: {
    top: "75%",
    zIndex: 1001,
    width: "100%",
    borderWidth: 1,
    borderTopWidth: 0,
    overflow: "hidden",
    position: "absolute",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  divider: {
    height: 1,
    width: "100%",
  },
});
