import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginResponse: [],
  loginCalling: false,
  registrationCalling: false,
};

export const authSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    loginDone: (state, action) => ({
      ...state,
      //   customers: action.payload,
    }),
    registrationDone: (state, action) => ({
      ...state,
      //   customers: action.payload,
    }),
  },
});

export const { loginDone, registrationDone } = authSlice.actions;

export default authSlice.reducer;
