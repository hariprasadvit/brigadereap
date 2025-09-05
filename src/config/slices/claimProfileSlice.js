// features/claimProfile/claimProfileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios';


export const claimProfile = createAsyncThunk(
    'claimProfile/submit',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post('/start-up-request/create/', payload);
  
        return response.data;
      } catch (error) {
        const message =
          error.response?.data?.message || error.message || 'Something went wrong';
        return rejectWithValue(message);
      }
    }
  );

const claimProfileSlice = createSlice({
  name: 'claimProfile',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetClaimState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(claimProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(claimProfile.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(claimProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to submit claim';
      });
  },
});

export const { resetClaimState } = claimProfileSlice.actions;
export default claimProfileSlice.reducer;
