import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_URL, BASE_URL } from "./../constant";

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  let res = await fetch(`${BASE_URL}${AUTH_URL}/protected`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    if (res.error) {
      throw new Error(res.error);
    }
  }
  res = res.json();

  return res;
});

const initialState = {
  isLoading: true,
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    logout: (state, action) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
