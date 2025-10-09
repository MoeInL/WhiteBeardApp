/*** Universities Types ***/
export type UniversityType = {
  name: string;
  country: string;
  domains: string[];
  web_pages: string[];
  alpha_two_code: string;
  "state-province"?: string | null;
};

export type UniversityReqType = {
  name: string;
  country?: string;
};

export type UniversitiesResType = UniversityType[];
