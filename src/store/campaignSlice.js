import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
export const fetchCampaigns = createAsyncThunk(
  "campaigns/fetchCampaigns",
  async ({ page, page_size }) => {
    const token = Cookies.get("access_token");
    if (!token) {
      return;
    }
    const response = await fetch(
      `http://127.0.0.1:8000/campaign/api/campaigns/?page=${page}&page_size=${page_size}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

const campaignSlice = createSlice({
  name: "campaigns",
  initialState: {
    list: [],
    status: "idle",
    currentPage: 1,
    totalPages: 1,
    pageSize: 5,
    totalCount: 0,
  },
  reducers: {
    removeCampaign: (state, action) => {
      state.list = state.list.filter((c) => c.id !== action.payload);
    },
    setPagination: (state,action)=>{
        state.currentPage=action.payload.page
        state.pageSize=action.payload.page_size
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.campaigns || [];
        state.totalCount = action.payload.pagination.total_count
        state.totalPages = action.payload.pagination.total_pages
      })
      .addCase(fetchCampaigns.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { removeCampaign, setPagination } = campaignSlice.actions;
export default campaignSlice.reducer;
