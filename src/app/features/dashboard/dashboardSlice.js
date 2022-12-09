import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderCount: 0,
  customerCount: 0,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getSummaryDone: (state, action) => ({
      ...state,
      orderCount: action.payload.orderCount,
      customerCount: action.payload.customerCount,
    }),
  },
});

export const { getSummaryDone } = dashboardSlice.actions;

export default dashboardSlice.reducer;
