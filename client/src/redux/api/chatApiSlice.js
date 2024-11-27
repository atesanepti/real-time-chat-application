import { CHAT_URL } from "../constant";
import apiSlice from "./apiSlice";

const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: (data) => ({
        url: `${CHAT_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["chat"],
    }),

    findChats: builder.query({
      query: () => ({
        url: `${CHAT_URL}`,
        credentials: "include",
      }),
      providesTags: ["chat"],
    }),

    findRequestedChats: builder.query({
      query: () => ({
        url: `/${CHAT_URL}/request-chat`,
        credentials: "include",
      }),
      providesTags: ["chat"],
    }),

    updateChat: builder.mutation({
      query: ({ data, id }) => ({
        url: `${CHAT_URL}/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["chat"],
    }),

    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `${CHAT_URL}/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["chat"],
    }),

    blockChat: builder.mutation({
      query: (userId) => ({
        url: `${CHAT_URL}/block/${userId}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["chat"],
    }),
    unBlockChat: builder.mutation({
      query: (userId) => ({
        url: `${CHAT_URL}/unblock/${userId}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    chatAccessChecke: builder.mutation({
      query: (userId) => ({
        url: `${CHAT_URL}/check-chat-access/${userId}`,
        credentials: "include",
      }),
    }),

    chatActivate: builder.mutation({
      query: (chatId) => ({
        url: `${CHAT_URL}/activate-chat/${chatId}`,
        credentials: "include",
        method: "PUT",
        body: {},
      }),
      invalidatesTags: ["chat"],
    }),
  }),
});

export const {
  useCreateChatMutation,
  useFindChatsQuery,
  useFindRequestedChatsQuery,
  useUpdateChatMutation,
  useDeleteChatMutation,
  useBlockChatMutation,
  useChatAccessCheckeMutation,
  useUnBlockChatMutation,
  useChatActivateMutation,
} = chatApiSlice;
