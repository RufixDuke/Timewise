import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    auth: false,
  },
  reducers: {
    login: (state) => {
      state.auth = true;
    },
    logOut: (state) => {
      state.auth = false;
    },
  },
});

export const { login, logOut } = AuthSlice.actions;

export default AuthSlice.reducer;
