import { toast } from "sonner";
import type { RootState } from "..";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URL as string,
  // prepareHeaders: (headers) => {
  //   headers.set("Content-Type", "application/json");
  // }

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).global.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  },
});

const baseQueryWith401Handling: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401 || result.error?.status === 403) {
    localStorage.clear();
    window.location.replace("/");
    toast.error(`Error ${result.error?.status}`);
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWith401Handling,
  keepUnusedDataFor: 5,
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    healthCheck: build.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      transformResponse: (response: HealthCheck) => response,
    }),
  }),
  // endpoints: () => ({}),
});
