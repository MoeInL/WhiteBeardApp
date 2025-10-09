import { TextInput, Keyboard, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  interpolateColor,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  useImperativeHandle,
  useCallback,
  forwardRef,
  useEffect,
  useState,
  useRef,
} from "react";

import { useDebouncing } from "@/src/hooks";
import { useTheme } from "@/src/store";

import { searchInputStyles, searchInputConfig } from "./config";
import { SearchInputProps, type SearchInputRef } from "./types";
import { Icon } from "../../base";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const SearchInput = forwardRef<SearchInputRef, SearchInputProps>(
  (
    {
      value,
      onPress,
      onFocus,
      onClear,
      onSearch,
      containerStyle,
      autoFocus = false,
      placeholder = searchInputConfig.placeholder,
    },
    ref
  ) => {
    /***** Refs ******/
    const inputRef = useRef<TextInput>(null);

    /***** States ******/
    const [internalSearchQuery, setInternalSearchQuery] = useState("");

    /***** Constants ******/
    const { theme } = useTheme();
    const searchQuery = internalSearchQuery;
    const debouncedQuery = useDebouncing(internalSearchQuery);

    /***** Animations ******/
    const focusAnimation = useSharedValue(0);
    const animatedBorderStyle = useAnimatedStyle(() => {
      const borderColor = interpolateColor(
        focusAnimation.value,
        [0, 1],
        [theme.colors.border, theme.colors.primary]
      );

      return {
        borderColor,
      };
    });
    const iconAnimatedStyle = useAnimatedStyle(() => {
      const color = interpolateColor(
        focusAnimation.value,
        [0, 1],
        [theme.colors.secondaryText, theme.colors.primary]
      );

      return {
        color,
      };
    });

    useEffect(() => {
      if (value !== undefined) {
        setInternalSearchQuery(value);
      }
    }, [value]);
    useEffect(() => {
      if (
        debouncedQuery.length > searchInputConfig.minQueryLength ||
        debouncedQuery.length === 0
      ) {
        Keyboard.dismiss();
        onSearch?.(debouncedQuery);
      }
    }, [debouncedQuery, onSearch]);

    const handleClear = useCallback(() => {
      setInternalSearchQuery("");
      inputRef.current?.clear();
      onSearch?.("");
      onClear?.();
    }, [onSearch, onClear]);
    const handleFocus = useCallback(() => {
      focusAnimation.value = withTiming(1, { duration: 200 });
      onFocus?.();
    }, [focusAnimation, onFocus]);
    const handleBlur = useCallback(() => {
      focusAnimation.value = withTiming(0, { duration: 200 });
    }, [focusAnimation]);

    useImperativeHandle(
      ref,
      () => ({
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        clear: handleClear,
      }),
      [handleClear]
    );

    return (
      <AnimatedTouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.8}
        style={[
          containerStyle,
          animatedBorderStyle,
          searchInputStyles.container,
          { pointerEvents: !onPress ? "auto" : "none" },
        ]}
      >
        <Icon
          name="magnify"
          style={searchInputStyles.icon}
          color={iconAnimatedStyle.color}
          size={searchInputConfig.iconSize}
        />

        <TextInput
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={searchQuery}
          editable={!onPress}
          autoCapitalize="none"
          autoFocus={autoFocus}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.primaryText}
          style={[
            searchInputStyles.input,
            {
              color: theme.colors.primaryText,
              pointerEvents: !onPress ? "auto" : "none",
            },
          ]}
          onChangeText={(text) => {
            setInternalSearchQuery(text);
          }}
        />

        {searchQuery.length > 0 && (
          <MaterialCommunityIcons
            name="close"
            onPress={handleClear}
            color={theme.colors.primary}
            style={{ paddingVertical: 12 }}
            size={searchInputConfig.iconSize}
          />
        )}
      </AnimatedTouchableOpacity>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
export type { SearchInputRef };
