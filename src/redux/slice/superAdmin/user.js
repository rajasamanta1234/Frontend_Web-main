/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: "disconnected",
  isInitialized: false,
  user: null,
};

export const slice = createSlice({
  name: "superAdminAuth",
  initialState,
  reducers: {
    setAuthUserState: (_state, _action) => {
      const { user, isAuthenticated, isInitialized } = _action.payload;
      return {
        ..._state,
        isAuthenticated: isAuthenticated,
        user: user,
        isInitialized: isInitialized,
      };
    },
    logout: (_state, _action) => {
      localStorage.removeItem("token");
      return { ..._state, user: null, isAuthenticated: "disconnected" };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthUserState, logout } = slice.actions;

export default slice.reducer;

export const getAuthState = (state) => state.auth;
