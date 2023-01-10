import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderCount: 0,
  customerCount: 0,
  deliveryCount: 0,
  reports:[]
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getSummaryDone: (state, action) => ({
      ...state,
      orderCount: action.payload.orderCount,
      customerCount: action.payload.customerCount,
      deliveryCount: action.payload.deliveryCount,
    }),
    getReportsDataDone:(state, action) => ({
      ...state,
      reports: action.payload
    })
  },
});

export const { getSummaryDone, getReportsDataDone } = dashboardSlice.actions;

export default dashboardSlice.reducer;
