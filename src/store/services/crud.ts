import { api } from "./core";

export const registerApi = api.injectEndpoints({
  endpoints: (build) => ({
    getItems: build.query<Items[], void>({
      query: () => ({
        url: "/items",
        method: "GET",
      }),
      providesTags: ["Items"],
      transformResponse: (response: {
        status: number;
        data: Items[];
        message: string;
      }) => {
        return response.data;
      },
    }),
    postItems: build.mutation({
      query: (Item) => ({
        url: "/items",
        method: "POST",
        body: Item,
      }),
      invalidatesTags: ["Items"],
    }),
    editItem: build.mutation({
      query: ({ id, data }: { id: number | string; data: Partial<Items> }) => ({
        url: `/items/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Items"],
    }),
    
    deleteItem: build.mutation({
      query: (id: number | string) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Items"],
    }),
  }),
});

export const { useGetItemsQuery, usePostItemsMutation, useEditItemMutation, useDeleteItemMutation } =
  registerApi;
