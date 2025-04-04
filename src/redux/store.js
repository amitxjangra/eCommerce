import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter";
import authSlice from "./slices/auth";
import cartSlice from "./slices/cart";
import { apiMiddleware } from "./middlewares/api";

const store = configureStore({
  reducer: { counter: counterReducer, auth: authSlice, cart: cartSlice },
  middleware: (defaultMiddlewares) =>
    defaultMiddlewares().concat(apiMiddleware),
});

export default store;
