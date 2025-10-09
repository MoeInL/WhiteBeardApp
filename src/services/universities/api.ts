import { AxiosError } from "axios";

import { withErrorCatch } from "../axios/error";
import { apiClient } from "../axios/interceptor";

import type { UniversitiesResType, UniversityReqType } from "./types";

/*** API for get universities ***/
export const getUniversitiesApi = async (
  data: UniversityReqType,
  offset: number = 0
) => {
  const { name, country } = data;
  let url = `/search?&limit=10&offset=${offset}`;

  if (name) {
    url += `&name=${name}`;
  }

  if (country) {
    url += `&country=${country}`;
  }

  const [response, error] = await withErrorCatch(
    apiClient.get<UniversitiesResType>(url)
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
