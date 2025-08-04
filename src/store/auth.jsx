// store/login.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "AIzaSyDGJWPo3rA_BoZdiRHAWGnLbtiSQeaNJYA";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
      return { token: res.data.idToken, email: res.data.email };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.error.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
      return { token: res.data.idToken, email: res.data.email };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.error.message);
    }
  }
);

export const sendPasswordReset = createAsyncThunk(
  "auth/sendPasswordReset",
  async (email, thunkAPI) => {
    try {
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        {
          requestType: "PASSWORD_RESET",
          email,
        }
      );
      return "Password reset link sent.";
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    email: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.email = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
    loadStoredUser(state) {
      state.token = localStorage.getItem("token");
      state.email = localStorage.getItem("email");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.email = action.payload.email;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("email", action.payload.email);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.email = action.payload.email;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("email", action.payload.email);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(sendPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendPasswordReset.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(sendPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, loadStoredUser } = loginSlice.actions;

export default loginSlice.reducer;
