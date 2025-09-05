import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import startupReducer from './slices/startupSlice';
import claimProfileReducer from './slices/claimProfileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    startups: startupReducer,
    claimProfile: claimProfileReducer
  },
});

export default store;
