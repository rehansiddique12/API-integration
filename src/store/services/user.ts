import { api } from "./core";

export const todoApi = api.injectEndpoints({
  endpoints: (build) => ({
  
    postTodo: build.mutation({
      query: (todo) => ({
        url: "/",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
   
    
  }),
});

export const {
  usePostTodoMutation,
} = todoApi;