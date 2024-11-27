import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  variant: "",
  message: {},
};
const notificationMSlice = createSlice({
  name: "notificationM",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      console.log(action.payload)
      state.variant = action.payload.variant;
      state.message = action.payload.message;
    },
    clearNotification: (state, action) => {
      console.log("callsed")
      state.message = {};
      state.variant = "";
    },
  },
});
export default notificationMSlice.reducer;

export const { setNotification, clearNotification } =
  notificationMSlice.actions;
