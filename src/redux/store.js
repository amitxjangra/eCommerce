import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter";
import authSlice from "./slices/auth";
import cartSlice from "./slices/cart";
import productSlice from "./slices/products";
import searchSlice from "./slices/search";

import { apiMiddleware } from "./middlewares/api";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice,
    cart: cartSlice,
    products: productSlice,
    search: searchSlice,
  },
  middleware: (defaultMiddlewares) =>
    defaultMiddlewares().concat(apiMiddleware),
});

export default store;
