import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser:null,
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
          state.loading=false
      },
      deleteSuccess:(state)=>{
        state.currentUser=null,
        state.loading=false,
        state.error=null
      },
      deleteFailure:(state,action)=>{
        state.error=action.payload,
        state.loading=false
      },
      signOutFromAccount:(state)=>{
        state.currentUser=null,
        state.error=null,
        state.loading=false
      }
    }
})

export const { getLoading, getSuccess,getFailure,deleteFailure,deleteSuccess,signOutFromAccount} = authSlice.actions

export default authSlice.reducer;

