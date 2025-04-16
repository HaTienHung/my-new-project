import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";
import authReducer from "./auth-slice";
import authModalReducer from "./authModal-slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    authModal: authModalReducer,
  },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
