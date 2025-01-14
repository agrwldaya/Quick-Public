import { configureStore } from '@reduxjs/toolkit';
import AuthdataSlice from './authSlice';
import ClientAuthdataSlice from './clientAuthSliece';
import newsDataSlice from './newsDataSlice';
import EmpSlice from './empStore';

// Configure the store without persistence
export const NewsStore = configureStore({
  reducer: {
    authData: AuthdataSlice.reducer,
    clientData: ClientAuthdataSlice.reducer,
    newsData: newsDataSlice.reducer,
    empData:  EmpSlice.reducer
  },
});
