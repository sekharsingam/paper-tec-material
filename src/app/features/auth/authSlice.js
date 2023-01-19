import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginResponse: [],
  loginCalling: false,
  loginError: null,
  registrationCalling: false,
  isLoggedIn: false,
  loggedInUser: localStorage.user ? JSON.parse(localStorage.user) : null,
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
      loginCalling: false,
      loggedInUser: action.payload,
      isLoggedIn: action.payload ? true : false,
      loginError: null,
    }),
    loginDoneWithError: (state, action) => ({
      ...state,
      loginError: action.payload,
      loginCalling: false,
      loggedInUser: null,
      isLoggedIn: false,
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
      loggedInUser: null,
    }),
  },
  extraReducers: {},
});

export const {
  loginCalling,
  loginDone,
  loginDoneWithError,
  registrationCalling,
  registrationDone,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
