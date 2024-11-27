import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  block: null,
  unBlock: null,
  chat: null,
};

const blockSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    addToBlock: (state, action) => {
      state.block = action.payload.block || null;
      state.chat = action.payload.chat;
      state.unBlock = action.payload.unBlock || null;
    },
    removeToBlock: (state, action) => {
      state.block = null;
      state.chat = null;
      state.unBlock = null;
    },
  },
});

export const { addToBlock, removeToBlock } = blockSlice.actions;
export default blockSlice.reducer;
