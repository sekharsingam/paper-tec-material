import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cupSize: [],
  paperSupplier: [],
};

export const masterDataSlice = createSlice({
  name: "masterData",
  initialState,
  reducers: {
    getMasterDataDone: (state, action) => ({
      ...state,
      cupSize: action.payload ? action.payload.cupSize : [],
      paperSupplier: action.payload ? action.payload.paperSupplier : [],
    }),
  },
});

export const { getMasterDataDone } = masterDataSlice.actions;

export default masterDataSlice.reducer;
