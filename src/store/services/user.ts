import { api } from "./core";

export const todoApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTodo: build.query({
      query: () => ({
        url: "/Todo",
        method: "GET",
      }),
      providesTags: ["Todo"],
      transformResponse: (response: Todo[]) => response,
    }),



    // Psot API For Todo
    postTodo: build.mutation({
      query: ({todo}) => ({
        url: "/Todo",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),

    deleteTodo: build.mutation({
      query: (todo_id: string) => ({
        url: `/Todo/${todo_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),


    editTodo: build.mutation({
      query: ({ todo_id, todo }: { todo_id: string; todo: Todo }) => ({
        url: `/Todo/${todo_id}`,
        method: "PUT",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),

    
  }),
});

export const {
  useGetTodoQuery,
  usePostTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation
} = todoApi;

export default todoApi;