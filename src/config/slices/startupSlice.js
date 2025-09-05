// store/slices/startupSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios";

export const fetchStartups = createAsyncThunk(
  "startups/fetchStartups",
  async (params) => {
    if (
      params.is_reap_company &&
      params.is_reap_company.split(",").sort().join(",") === "false,true"
    ) {
      delete params.is_reap_company;
    }
    const query = new URLSearchParams(params).toString();
    const response = await axiosInstance.get(
      `/start-up/list_all_startup/?${query}&paginate=1`
    );
    return response.data;
  }
);

const startupSlice = createSlice({
  name: "startups",
  initialState: {
    list: {},
    loading: false,
    filters: {},
  },
  reducers: {
    setStartups: (state, action) => {
      state.list = action.payload;
    },
    appendStartups: (state, action) => {
      const newResults = action.payload?.data?.results || [];
      state.list.data.results = [...(state.list.data.results || []), ...newResults];
      state.list.pagination = action.payload?.pagination;
      state.list.data.total_approved_startups_count = action.payload?.data?.total_approved_startups_count;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchStartups.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(fetchStartups.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.list = action.payload;
  //     })
  //     .addCase(fetchStartups.rejected, (state) => {
  //       state.loading = false;
  //     });
  // },
});

export const { setStartups, appendStartups } = startupSlice.actions;
export default startupSlice.reducer;
