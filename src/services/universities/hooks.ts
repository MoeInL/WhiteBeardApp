import { useInfiniteQuery } from "@tanstack/react-query";

import { getUniversitiesApi } from "./api";

import type { UniversitiesResType, UniversityType } from "./types";
import { ResErrorType } from "../axios/types";

const ITEMS_PER_PAGE = 10;

const useGetUniversities = (search: string) => {
  return useInfiniteQuery<
    UniversitiesResType,
    ResErrorType,
    UniversityType[],
    [string, string],
    number
  >({
    initialPageParam: 0,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    queryKey: ["getUniversities", search],
    enabled: !!search && search.length > 0,
    queryFn: ({ pageParam }) => getUniversitiesApi(search, pageParam),
    select: (data) => data.pages.flatMap((page) => page),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < ITEMS_PER_PAGE) {
        return undefined;
      }
      return allPages.length * ITEMS_PER_PAGE;
    },
  });
};

export const UniversityService = {
  useGetUniversities,
};
