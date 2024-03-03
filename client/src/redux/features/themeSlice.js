import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

 const themeSlice=createSlice({
    name:"theme",
    initialState,
    reducers:{
     isDark:(state)=>{
         state.theme=state.theme==="light"?"dark":"light"
     }
    }
})

export const {isDark}=themeSlice.actions;
export default themeSlice.reducer;
