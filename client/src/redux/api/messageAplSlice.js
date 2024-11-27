import { MESSAGE_URL } from "../constant";
import apiSlice from "./apiSlice";

const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: ({ data, chatId }) => ({
        url: `${MESSAGE_URL}/${chatId}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["message"],
    }),

    findMessages: builder.mutation({
      query: (chatId) => ({
        url: `${MESSAGE_URL}/${chatId}`,
        credentials: "include",
      }),
      providesTags: ["message"],
    }),

    deleteMessage: builder.mutation({
      query: (messageId) => ({
        url: `${MESSAGE_URL}/${messageId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["message"],
    }),
  }),
});

export const {
  useCreateMessageMutation,
  useFindMessageMutation,
  useDeleteMessageMutation,
} = messageApiSlice;
