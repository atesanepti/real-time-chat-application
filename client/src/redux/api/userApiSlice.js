import { AUTH_URL, USER_URL } from "../constant";
import apiSlice from "./apiSlice.js";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: USER_URL,
        body: data,
        method: "POST",
      }),
    }),
    userVerify: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `${USER_URL}/verify`,
        body: data,
      }),
    }),
    findUser: builder.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    findUsers : builder.query({
      query : ({search = "", page = 1}) => ({
        url : `${USER_URL}?search=${search}&page=${page}`,
        method : "GET",
        credentials : "include"
      }),
      providesTags : ["user"]
    }),
    findMine: builder.query({
      query: () => ({
        url: `${USER_URL}/mine`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: USER_URL,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: USER_URL,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    forgetPassword: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/forget-password/${id}`,
        method: "GET",
      }),
    }),
    otpVerify: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/otp-verify`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/reset-password`,
        method: "PUT",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "GET",
        credentials: "include",
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/change-password`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    setBio: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/bio`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useFindUserQuery,
  useFindMineQuery,
  useFindUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useLoginUserMutation,
  useLogoutMutation,
  useUserVerifyMutation,
  useChangePasswordMutation,
  useSetBioMutation,
  useOtpVerifyMutation,
} = userApiSlice;
