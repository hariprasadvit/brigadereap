import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import Cookies from "js-cookie";

let abortController; // shared controller

export const cancelSignupRequest = () => {
  if (abortController) {
    abortController.abort(); // ✅ cancel ongoing request
    abortController = null;
  }
};

// Async thunk for signup API
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ data, mode }, { rejectWithValue, signal }) => {
    try {
      // Cancel any existing request
      if (abortController) abortController.abort();

      abortController = new AbortController();
      signal.addEventListener("abort", () => abortController.abort());
     
      const response = await axios.post(
        mode === "otp"
          ? "users/verify/mobile/otp/"
          : mode === "signin"
          ? "users/signin/mobile/"
          : "users/signup/mobile/",
        data,
        { signal: abortController.signal }
      );

      return response.data;
    } catch (error) {
      // if (axios.isCancel(error) || error.name === "CanceledError") {
      //   return rejectWithValue(error.response?.data || { message: "Request cancelled" });
      // }
      return rejectWithValue(error.response.data || { message: "Signup failed" });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    user: null,
    currentRequestId: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(signup.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;
        state.loading = false;
        state.user = action.payload?.data;

        if (
          action.meta.arg.mode === "otp" &&
          action.payload?.data?.access_token
        ) {
          const token = action.payload.data.access_token;
          Cookies.set("access_token", token, {
            expires: 7,
            secure: true,
            sameSite: "Lax",
          });
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if (state.currentRequestId !== action.meta.requestId) return;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
