import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

import { type UniversityType } from "@/src/services";

type UserProviderType = {
  isUserInitialized: boolean;
  favorites: UniversityType[];
  toggleFavorite: (university: UniversityType) => void;
};

const UserProviderContext = createContext<UserProviderType>({
  favorites: [],
  toggleFavorite: () => {},
  isUserInitialized: false,
});

const STORAGE_KEYS = {
  FAVORITES: "favorites",
} as const;

export const useUserProvider = () => useContext(UserProviderContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  /***** State ******/
  const [favorites, setFavorites] = useState<UniversityType[]>([]);
  const [isUserInitialized, setIsUserInitialized] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
        const parsedFavorites = JSON.parse(favorites || "[]");
        setFavorites(parsedFavorites || []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setIsUserInitialized(true);
      }
    };

    fetchFavorites();
  }, []);

  const toggleFavorite = (university: UniversityType) => {
    const isFavorite = favorites.some((f) => f.name === university.name);
    let newFavorites: UniversityType[] = [];

    if (isFavorite) {
      newFavorites = favorites.filter((f) => f.name !== university.name);
      setFavorites(newFavorites);
    } else {
      newFavorites = [...favorites, university];
      setFavorites(newFavorites);
    }

    AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites));
  };

  return (
    <UserProviderContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isUserInitialized,
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};
