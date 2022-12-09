import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
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

    createOrder: (state) => ({ ...state, createOrderCalling: true }),
    createOrderDone: (state, action) => ({
      ...state,
      createOrderCalling: false,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { getOrders, getOrdersDone, createOrder, createOrderDone } =
  ordersSlice.actions;

export default ordersSlice.reducer;
