import { createSlice } from "@reduxjs/toolkit";

 

const EmpSlice = createSlice({
  name: "EmpData",

  initialState: { 
    localNews:[],
    AdNews:[],
    EmpProfile:{}
  },
  reducers: {
    AddLocalNews: (state, action) => {
      state.localNews = [...state.localNews, ...action.payload];
       
      //console.log(state.localNews)
    },
    AddAdNews:(state,action)=>{
        state.AdNews = [...state.AdNews, ...action.payload];
    },
    getProfile:(state,action)=>{
      state.EmpProfile = {...action.payload}
      console.log(state.EmpProfile)
    }
    
  }
});

export default EmpSlice;
export const EmpSliceActions = EmpSlice.actions;

