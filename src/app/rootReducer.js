import { combineReducers } from "@reduxjs/toolkit";
import orderReducer from './features/orders/ordersSlice';

const rootReducer = combineReducers({
    order: orderReducer,
})

export default rootReducer;
