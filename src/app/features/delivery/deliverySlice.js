import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deliveries: [],
};

export const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    getDeliveriesDone: (state, action) => ({
      ...state,
      deliveries: action.payload,
    }),
    createDeliveryDone: (state, action) => ({
      ...state,
      createDeliveryCalling: false,
    }),
  },
});

export const { getDeliveriesDone, createDeliveryDone } = deliverySlice.actions;

export default deliverySlice.reducer;
