import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  orderDetails: {},
  requestedOrders: [],
  allPaymentDetails: [],
  getOrdersCalling: false,
  createOrderCalling: false,
};

export const ordersSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrders: (state) => ({ ...state, getOrdersCalling: true }),
    getOrdersDone: (state, action) => ({
      ...state,
      orders: action.payload,
      getOrdersCalling: false,
    }),
    getOrderDone: (state, action) => ({
      ...state,
      orderDetails: action.payload,
    }),
    getRequestOrdersDone: (state, action) => ({
      ...state,
      requestedOrders: action.payload,
      getOrdersCalling: false,
    }),
    getAllPaymentDetailsDone: (state, action) => ({
      ...state,
      allPaymentDetails: action.payload,
    }),
    createOrder: (state) => ({ ...state, createOrderCalling: true }),
    createOrderDone: (state, action) => ({
      ...state,
      createOrderCalling: false,
    }),
  },
});

// Action creators are generated for each case reducer function
export const {
  getOrders,
  getOrdersDone,
  getOrderDone,
  getRequestOrdersDone,
  getAllPaymentDetailsDone,
  createOrder,
  createOrderDone,
} = ordersSlice.actions;

export default ordersSlice.reducer;
