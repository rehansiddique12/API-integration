import { setToken, setUserData } from "../slices/global";
import { api } from "./core";

export const registerApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerApi: build.mutation({
      query: (payload) => ({
        url: "/users/register",
        method: "POST",
        body: payload,
      }),
    }),
    loginApi: build.mutation({
      query: (payload) => ({
        url: "/users/login",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const result = (await queryFulfilled) as PostLoginResponse;
        dispatch(setToken(result.data.data.token));
        dispatch(setUserData({
          id: result.data.data.id,
          first_name: result.data.data.first_name,
          last_name: result.data.data.last_name,
          email: result.data.data.email,
          profile_picture: result.data.data.profile_picture,
        }));
      },
    }),
  }),
});

export const { useRegisterApiMutation, useLoginApiMutation } = registerApi;
