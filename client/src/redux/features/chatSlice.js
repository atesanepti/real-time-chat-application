import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  chat: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (state, action) => {
      state.chat = action.payload;
    },
    removeChat: (state, action) => {
      state.chat = null;
    },
  },
});

export const { addChat, removeChat } = chatSlice.actions;
export default chatSlice.reducer;
