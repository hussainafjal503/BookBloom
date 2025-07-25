import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";
const userSlice = createSlice({
  name: "User",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: null,
    error: null,
    message: null,
  },
  reducers: {
    registerRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message
    },
    fetchUserRequest(state, action) {
      state.loading = true;
      (state.isAuthenticated = false);
      (state.user = {});
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      (state.isAuthenticated = false), (state.user = {});
      state.error = action.payload;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },
    logoutSuccess(state, action) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.message=action.payload?.message;
      console.log(state.message);
    },
    logoutFailed(state, action) {
      state.isAuthenticated = state.isAuthenticated;
      state.user = {};
      state.error = action.payload;
    },
    clearAllError(state, action) {
      state.error = null;
      state.user = state.user;
    },
  },
});

export const register = (data) => async (dispatch) => {
  console.log(data);
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/register",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(userSlice.actions.registerSuccess(response.data));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed(error.response.data.message));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/login",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(userSlice.actions.loginSuccess(response.data));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/getuser",
      {
        withCredentials: true,
      }
    );
// console.log(response);
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/logout",
      {
        withCredentials: true,
      }
    );

	dispatch(userSlice.actions.logoutSuccess());
	dispatch(userSlice.actions.clearAllError());

  } catch (error) {
	dispatch(userSlice.actions.clearAllError(error.response.data.message))
  }
};

export const clearAllError = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllError());
};

export default userSlice.reducer;
