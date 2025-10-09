import axios from "axios";

import { ENV } from "@/src/constants";

export const apiClient = axios.create({
  baseURL: ENV.API_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    if (ENV.ENABLE_API_LOGS) {
      console.info(
        "\n===== API Request =====",
        `\nMethod: ${config.method?.toUpperCase()}`,
        `\nURL:    ${config.url}`,
        `\nParams: ${JSON.stringify(config.params, null, 2)}`,
        `\nData:   ${JSON.stringify(config.data, null, 2)}`,
        "\n======================="
      );
    }
    return config;
  },
  (error) => {
    if (ENV.ENABLE_API_LOGS) {
      console.error(
        "\n=== API Request Error ===",
        `\nURL:     ${error.config?.url}`,
        `\nMessage: ${error.message}`,
        `\nStatus:  ${error.response?.status}`,
        `\nData:    ${JSON.stringify(error.response?.data, null, 2)}`,
        "\n========================="
      );
    }
    return Promise.reject(error);
  }
);
