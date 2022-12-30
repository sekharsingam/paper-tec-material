import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import orderReducer from "./features/orders/ordersSlice";
import customerReducer from "./features/customer/customerSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import masterDataReducer from "./features/masterData/masterDataSlice";
import deliveryReducer from "./features/delivery/deliverySlice";

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  customer: customerReducer,
  dashboard: dashboardReducer,
  masterData: masterDataReducer,
  delivery: deliveryReducer,
});

export default rootReducer;
