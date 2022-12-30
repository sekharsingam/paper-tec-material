import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginResponse: [],
  loginCalling: false,
  loginError: null,
  registrationCalling: false,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginCalling: (state) => ({
      ...state,
      loginCalling: true,
      isLoggedIn: false,
      loginError: null,
    }),
    loginDone: (state, action) => ({
      ...state,
      loginError: action.payload,
      loginCalling: false,
      isLoggedIn: action.payload ? false : true,
    }),
    registrationCalling: (state) => ({
      ...state,
      registrationCalling: true,
    }),
    registrationDone: (state, action) => ({
      ...state,
      registrationError: action.payload,
      registrationCalling: false,
    }),
    logout: (state, action) => ({
      ...state,
      isLoggedIn: false,

    })
  },
  extraReducers: {},
});

export const {
  loginCalling,
  loginDone,
  registrationCalling,
  registrationDone,
  logout

} = authSlice.actions;

export default authSlice.reducer;
