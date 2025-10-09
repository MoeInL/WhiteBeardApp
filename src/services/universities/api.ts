import { AxiosError } from "axios";

import { withErrorCatch } from "../axios/error";
import { apiClient } from "../axios/interceptor";

import type { UniversitiesResType } from "./types";

/*** API for get universities ***/
export const getUniversitiesApi = async (
  search: string,
  offset: number = 0
) => {
  const [response, error] = await withErrorCatch(
    apiClient.get<UniversitiesResType>(
      `/search?name=${search}&limit=10&offset=${offset}`
    )
  );

  if (error instanceof AxiosError) {
    throw {
      ...error.response?.data,
      status: error.response?.status,
    };
  } else if (error) {
    throw error;
  }

  return response?.data || [];
};
