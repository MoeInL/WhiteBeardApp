import { useInfiniteQuery } from "@tanstack/react-query";

import { getUniversitiesApi } from "./api";

import { ResErrorType } from "../axios/types";
import type {
  UniversitiesResType,
  UniversityReqType,
  UniversityType,
} from "./types";

const ITEMS_PER_PAGE = 10;

const useGetUniversities = (data: UniversityReqType) => {
  const { name, country = "" } = data;

  return useInfiniteQuery<
    UniversitiesResType,
    ResErrorType,
    UniversityType[],
    [string, UniversityReqType],
    number
  >({
    initialPageParam: 0,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    queryKey: ["getUniversities", data],
    enabled: name.length > 0 || country.length > 0,
    queryFn: ({ pageParam }) => getUniversitiesApi(data, pageParam),
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
