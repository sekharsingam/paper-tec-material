import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  orderDetails: {},
  requestedOrders: [],
  allPaymentDetails: [],
  orderCreationSuccess: false,
  paymentProcessingSuccess: false,
};

export const ordersSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrders: (state) => ({ ...state }),
    getOrdersDone: (state, action) => ({
      ...state,
      orders: action.payload,
    }),
    getOrderDone: (state, action) => ({
      ...state,
      orderDetails: action.payload,
    }),
    getRequestOrdersDone: (state, action) => ({
      ...state,
      requestedOrders: action.payload,
    }),
    addPaymentProcessing: (state, action) => ({
      ...state,
      paymentProcessingSuccess: false,
    }),
    addPaymentDone: (state, action) => ({
      ...state,
      paymentProcessingSuccess: action.payload.success,
    }),
    getAllPaymentDetailsDone: (state, action) => ({
      ...state,
      allPaymentDetails: action.payload,
    }),
    createOrder: (state) => ({ ...state, orderCreationSuccess: false }),
    createOrderDone: (state, action) => ({
      ...state,
      orderCreationSuccess: action.payload.success,
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
  addPaymentProcessing,
  addPaymentDone,
} = ordersSlice.actions;

export default ordersSlice.reducer;
