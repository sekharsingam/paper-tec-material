import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    getCustomersDone: (state, action) => ({
      ...state,
      customers: action.payload,
    }),
    createCustomerDone: (state, action) => ({
      ...state,
      customers: action.payload,
      createOrderCalling: false,
    }),
  },
});

export const { getCustomersDone, createCustomerDone } = customerSlice.actions;

export default customerSlice.reducer;
