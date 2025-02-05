import {createSlice} from "@reduxjs/toolkit"
const authSlice = createSlice({
    name:"auth",
    initialState:{
        isAuthenticated:false,
        username: null,
        role: null,
        practices : []
    },
    reducers:{
        setUserData:(state,action)=>{
            state.username = action.payload.username;
            state.role = action.payload.role
            state.isAuthenticated = true
        },
        clearUserData:(state)=>{
            state.username = null
            state.role = null
            state.isAuthenticated = false
        },
        setStorePractices:(state,action)=>{
            state.practices = action.payload
        }
    }
})
export const {setUserData,clearUserData,setStorePractices} = authSlice.actions

export default authSlice.reducer