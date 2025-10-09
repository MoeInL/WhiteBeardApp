import { useMemo } from "react";

import { type UniversityType } from "@/src/services";
import { useUserProvider } from "@/src/store";

export const useHandleFavorites = (university: UniversityType) => {
  /***** Constants *****/
  const { toggleFavorite, favorites } = useUserProvider();

  /***** Memoization *****/
  const isInFavorites = useMemo(() => {
    return favorites?.some(
      (favorite: UniversityType) => favorite.name === university.name
    );
  }, [favorites, university.name]);

  const handleToggleFavorite = () => {
    toggleFavorite(university);
  };

  return {
    isInFavorites,
    handleToggleFavorite,
  };
};
