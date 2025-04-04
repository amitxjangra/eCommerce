import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: "",
  reducers: {
    updateToken: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateToken } = authSlice.actions;
export default authSlice.reducer;
