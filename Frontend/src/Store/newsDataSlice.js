import { createSlice } from "@reduxjs/toolkit";


const newsDataSlice = createSlice({
    name:"NewsData",
    initialState:{
     localNewData:{},
     adNewsData:{},
    },
    reducers:{
        addLocalNewsData:(state,action)=>{
           state.localNewData= {...state.localNewData,...action.payload}
           console.log(state.localNewData)
        },
        addAdNewsData:(state,action)=>{
            state.adNewsData= {...state.adNewsData,...action.payload}
            console.log(state.adNewsData)
         },
        reset:(state)=> {
            state.initialState={};
        }
    }
})


export const newsDataAction = newsDataSlice.actions
export default newsDataSlice