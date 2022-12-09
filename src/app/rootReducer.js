import { combineReducers } from "@reduxjs/toolkit";
import orderReducer from './features/orders/ordersSlice';
import customerReducer from './features/customer/customerSlice';
import dashboardReducer from './features/dashboard/dashboardSlice';
import masterDataReducer from './features/masterData/masterDataSlice';

const rootReducer = combineReducers({
    order: orderReducer,
    customer: customerReducer,
    dashboard: dashboardReducer,
    masterData: masterDataReducer
})

export default rootReducer;
