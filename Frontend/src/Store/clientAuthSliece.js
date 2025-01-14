import { createSlice } from "@reduxjs/toolkit";

 

const ClientAuthdataSlice = createSlice({
  name: "clientData",
  initialState: {
    SignupDataone: {},
    SignupDataTwo: {},
    clientData:{},
    empList:{},
    isVerifyMail: false,
    isAddedCompany: false,
    isAuthenticated: false,
  },
  reducers: {
    setSignupDataOne: (state, action) => {
      state.SignupDataone = { ...state.SignupDataone, ...action.payload };
    },
    setSignupDataTwo: (state, action) => {
      state.SignupDataTwo = { ...state.SignupDataTwo, ...action.payload };
    },
    verifyMail: (state) => {
      state.isVerifyMail = true;
      state.isAuthenticated = true;
    },
    addCompany: (state) => {
      state.isAddedCompany = true;
    },
    removeAuth: (state) => {
      state.isAuthenticated = false;
    },
    addClientData:(state,action)=>{
      state.clientData={...state.clientData,...action.payload}
      // console.log(state.clientData)
    },
    getEmpList:(state,action)=>{

    }
  }
});

export default ClientAuthdataSlice;
export const ClientAuthSliceActions = ClientAuthdataSlice.actions;
