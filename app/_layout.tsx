/* eslint-disable @typescript-eslint/no-require-imports */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useMemo } from "react";
import ToastManager from "toastify-react-native";
import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import {
  useUserProvider,
  ThemeProvider,
  UserProvider,
  useTheme,
} from "@/src/store";

import { ENV, AppVariant } from "@/src/constants";

import { CustomToast } from "@/src/components/preview";

// Allow Reactotron to be used in development mode
if (ENV.APP_VARIANT === AppVariant.DEV) {
  require("../ReactotronConfig");
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});
const toastConfig = {
  success: (props: any) => (
    <CustomToast
      type="success"
      onPress={props.hide}
      message={props.text1 || props.text2}
    />
  ),
  error: (props: any) => (
    <CustomToast
      type="error"
      onPress={props.hide}
      message={props.text1 || props.text2}
    />
  ),
  info: (props: any) => (
    <CustomToast
      type="info"
      onPress={props.hide}
      message={props.text1 || props.text2}
    />
  ),
  warning: (props: any) => (
    <CustomToast
      type="warning"
      onPress={props.hide}
      message={props.text1 || props.text2}
    />
  ),
};

const Navigation = () => {
  /*** Constants ***/
  const { theme, isThemeInitialized } = useTheme();
  const { isUserInitialized } = useUserProvider();

  /*** Memoization ***/
  const isAppReady = useMemo(() => {
    let isReady = isThemeInitialized && isUserInitialized;

    return isReady;
  }, [isUserInitialized, isThemeInitialized]);

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <>
      <Slot
        screenOptions={{
          animation: "fade",
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />

      <StatusBar style="auto" />
    </>
  );
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <QueryClientProvider client={queryClient}>
          <KeyboardProvider>
            <ThemeProvider>
              <UserProvider>
                <BottomSheetModalProvider>
                  <ToastManager config={toastConfig} useModal={false} />
                  <Navigation />
                </BottomSheetModalProvider>
              </UserProvider>
            </ThemeProvider>
          </KeyboardProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
