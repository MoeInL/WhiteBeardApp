import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useColorScheme } from "react-native";

import { Theme, ThemeMode, getTheme } from "@/src/constants/theme";

/****************** Hook ******************/
export type ThemePreference = "system" | "light" | "dark";
export type ThemeContextType = {
  theme: Theme;
  isThemeInitialized: boolean;
  setTheme: (preference: ThemePreference) => void;
};
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

/****************** Provider Component ******************/
export type ThemeProviderProps = {
  children: ReactNode;
};

const THEME_PREFERENCE_KEY = "auros_theme_preference";
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  /***** Constants ******/
  const systemColorScheme = useColorScheme();

  /***** State ******/
  const [isThemeInitialized, setIsThemeInitialized] = useState(false);
  const [themePreference, setThemePreference] =
    useState<ThemePreference>("system");

  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
        if (stored && ["system", "light", "dark"].includes(stored)) {
          setThemePreference(stored as ThemePreference);
        }
      } catch (error) {
        console.warn("Failed to load theme:", error);
      } finally {
        setIsThemeInitialized(true);
      }
    };

    initializeTheme();
  }, []);

  const setTheme = async (preference: ThemePreference) => {
    setThemePreference(preference);
    try {
      await AsyncStorage.setItem(THEME_PREFERENCE_KEY, preference);
    } catch (error) {
      console.warn("Failed to save theme:", error);
    }
  };
  const getCurrentTheme = (): ThemeMode => {
    if (themePreference === "system") {
      return systemColorScheme === "dark" ? "dark" : "light";
    }
    return themePreference as ThemeMode;
  };

  return (
    <ThemeContext.Provider
      value={{
        setTheme,
        isThemeInitialized,
        theme: getTheme(getCurrentTheme()),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
