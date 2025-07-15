import { api } from "./core";

export const registerApi = api.injectEndpoints({
  endpoints: (build) => ({
    getItems: build.query({
        query: () => ({
          url: "/Todo",
          method: "GET",
        }),
        providesTags: ["Items"],
        transformResponse: (response: Items[]) => response,
      }),
   
  }),
});

export const { useGetItemsQuery} = registerApi;