import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import Cookies from "js-cookie"
export const fetchCampaigns = createAsyncThunk('campaigns/fetchCampaigns', async()=>{
    const token = Cookies.get("access_token")
    if(!token){
        return
    }
    const response = await fetch("http://127.0.0.1:8000/campaign/api/campaigns/",
        {
            method:"GET",
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    return await response.json()
})

const campaignSlice = createSlice({
    name: 'campaigns',
    initialState: {list:[],status:"idle"},
    reducers:{
        removeCampaign:(state,action)=>{
            state.list=state.list.filter(c=>c.id!==action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchCampaigns.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchCampaigns.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.list = action.payload;
          })
          .addCase(fetchCampaigns.rejected, (state) => {
            state.status = 'failed';
          });
      }
})

export const { removeCampaign } = campaignSlice.actions;
export default campaignSlice.reducer;