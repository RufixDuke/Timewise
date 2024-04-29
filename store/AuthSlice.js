import { createSlice } from "@reduxjs/toolkit";
import { persistor } from ".";

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

export const logout = () => async (dispatch) => {
  await persistor.purge();
  await persistor.purge();
  dispatch(logOut());
};

export const { login, logOut } = AuthSlice.actions;

export default AuthSlice.reducer;
