import { AxiosError } from "axios";

import { withErrorCatch } from "../axios/error";
import { apiClient } from "../axios/interceptor";

import type { UniversitiesResType } from "./types";

/*** API for get universities ***/
export const getUniversitiesApi = async (search: string) => {
  const [response, error] = await withErrorCatch(
    apiClient.get<UniversitiesResType>(`/search?name=${search}`)
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
