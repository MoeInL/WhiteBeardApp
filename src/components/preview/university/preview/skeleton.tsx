import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { View, StyleSheet } from "react-native";

import { useTheme } from "@/src/store";

const UniversityPreviewSkeleton = () => {
  /*** Constants ***/
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.container,
        },
      ]}
    >
      <ContentLoader
        speed={1.5}
        width={350}
        height={100}
        viewBox="0 0 350 100"
        backgroundColor={String(theme.colors.background[1])}
        foregroundColor={String(theme.colors.background[2])}
      >
        {/* Icon Circle */}
        <Circle cx="40" cy="50" r="24" />

        {/* University Name - Line 1 */}
        <Rect x="80" y="20" rx="4" ry="4" width="180" height="16" />

        {/* University Name - Line 2 (shorter) */}
        <Rect x="80" y="42" rx="4" ry="4" width="140" height="14" />

        {/* Country Icon + Text */}
        <Circle cx="86" cy="68" r="6" />
        <Rect x="98" y="62" rx="3" ry="3" width="100" height="12" />

        {/* Domain Icon + Text */}
        <Circle cx="86" cy="88" r="6" />
        <Rect x="98" y="82" rx="3" ry="3" width="120" height="12" />

        {/* Heart Icon */}
        <Circle cx="300" cy="45" r="12" />

        {/* Open Icon */}
        <Circle cx="330" cy="45" r="10" />
      </ContentLoader>
    </View>
  );
};

export default UniversityPreviewSkeleton;

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    overflow: "hidden",

    // IOS Shadows
    shadowRadius: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    // Android Shadows
    elevation: 2,
  },
});
