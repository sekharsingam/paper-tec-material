import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state, action) => ({
      ...state,
      show: action.payload,
    }),
  },
});

export const { showLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
