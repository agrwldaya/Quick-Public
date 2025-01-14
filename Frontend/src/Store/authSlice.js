import { createSlice } from '@reduxjs/toolkit';

const AuthdataSlice = createSlice({
  name: "authData",
  initialState: {
    SignupData: {
      username: "",
      usermail: "",
      password: "",
      phoneNo: "",
      userState: "",
      userCity: "",
      userPincode: "",
      otp: ""
    },
    isAuthenticated: false
  },
  reducers: {
    addData: (state, action) => {
      state.SignupData = { ...state.SignupData, ...action.payload };
    },
    authenticate: (state) => {
      state.isAuthenticated = true;
      
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.SignupData = {};  
    }
  }
});

export default AuthdataSlice;
export const AuthSliceActions = AuthdataSlice.actions;
