import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    saveAllProducts: (state, action) => action.payload,
  },
});

export const { saveAllProducts } = productSlice.actions;
export default productSlice.reducer;
