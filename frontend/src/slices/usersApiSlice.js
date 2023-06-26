import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // we are making a post request so we add mutation
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data, // we are adding data because we are sending data (email and password)
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE'
      }),

    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetUsersQuery,
  useDeleteUserMutation
} = usersApiSlice;
