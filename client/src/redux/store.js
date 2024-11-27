import { configureStore } from "@reduxjs/toolkit";

import apiSlice from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./features/userSlice";
import notificationMReducer from "./features/notificationM";
import chatReducer from "./features/chatSlice";
import blockReducer from "./features/blockSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authR: authSlice,
    notificationMR: notificationMReducer,
    chatR: chatReducer,
    blockR: blockReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
