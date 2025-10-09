import { TouchableOpacity, StyleSheet } from "react-native";
import { useMemo } from "react";

import { useTheme } from "@/src/store";

import Icon from "../icon";
import Text from "../text";

export type DropDownItemType = {
  label: string;
  value: any;
};

type DropdownItemProps = {
  selectedValue: any;
  item: DropDownItemType;
  handleItemSelect: (item: DropDownItemType) => void;
};

const DropdownItem = ({
  item,
  handleItemSelect,
  selectedValue,
}: DropdownItemProps) => {
  /***** Constants *****/
  const { theme } = useTheme();

  /***** Memoization *****/
  const isSelected = useMemo(() => {
    if (typeof item.value === "object" && item.value !== null) {
      if (typeof selectedValue === "object" && selectedValue !== null) {
        return JSON.stringify(item.value) === JSON.stringify(selectedValue);
      }
      return false;
    }
    return selectedValue === item.value;
  }, [item.value, selectedValue]);

  return (
    <TouchableOpacity
      key={
        typeof item.value === "object" ? JSON.stringify(item.value) : item.value
      }
      activeOpacity={0.7}
      onPress={() => handleItemSelect(item)}
      style={[styles.item, { backgroundColor: theme.colors.container }]}
    >
      <Text color={theme.colors.primaryText} size={14}>
        {item.label}
      </Text>

      {isSelected && (
        <Icon name="check-circle" size={16} color={theme.colors.success} />
      )}
    </TouchableOpacity>
  );
};

export default DropdownItem;

const styles = StyleSheet.create({
  item: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
});
