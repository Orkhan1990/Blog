import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
      getLoading:(state)=>{
        state.loading=true;
        state.error=null
      },
      getSuccess:(state,action)=>{
        state.currentUser=action.payload;
        state.loading=false,
        state.error=null
      },
      getFailure:(state,action)=>{
          state.error=action.payload,
          state.currentUser=null,
          state.loading=false
      }
    }
})

export const { getLoading, getSuccess,getFailure } = authSlice.actions

export default authSlice.reducer;

