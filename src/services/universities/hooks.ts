import { useQuery } from "@tanstack/react-query";

import { getUniversitiesApi } from "./api";

import type { UniversitiesResType } from "./types";
import { ResErrorType } from "../axios/types";

const useGetUniversities = (search: string) => {
  return useQuery<UniversitiesResType, ResErrorType>({
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    queryKey: ["getUniversities", search],
    enabled: !!search && search.length > 0,
    queryFn: () => getUniversitiesApi(search),
  });
};

export const UniversityService = {
  useGetUniversities,
};
