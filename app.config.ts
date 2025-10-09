import { type AppVariantType } from "@/src/constants";
import { type ExpoConfig } from "expo/config";

const appVariant = process.env.APP_VARIANT as AppVariantType;

const getAppName = () => {
  if (appVariant === "development") {
    return "Whitebeard (Dev)";
  }

  if (appVariant === "preview") {
    return "Whitebeard (Preview)";
  }

  return "Whitebeard";
};
const getAppUniqueIdentifier = () => {
  if (appVariant === "development") {
    return "app.whitebeard.dev";
  }

  if (appVariant === "preview") {
    return "app.whitebeard.preview";
  }

  return "app.whitebeard.app";
};

const config: ExpoConfig = {
  name: getAppName(),
  version: "1.0.0",
  slug: "whitebeard",
  scheme: "whitebeard",
  newArchEnabled: true,
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  icon: "./src/assets/images/icon.png",
  ios: {
    supportsTablet: true,
    bundleIdentifier: getAppUniqueIdentifier(),
  },
  android: {
    edgeToEdgeEnabled: true,
    package: getAppUniqueIdentifier(),
    predictiveBackGestureEnabled: false,
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./src/assets/images/icon.png",
    },
  },
  web: {
    output: "static",
    favicon: "./src/assets/images/icon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        image: "./src/assets/images/icon.png",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
};

export default config;
