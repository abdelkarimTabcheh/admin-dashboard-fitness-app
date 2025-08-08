// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from './authSlice';
import exerciseReducer from './exerciseSlice';
import homeConfigReducer from './homeConfigSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
    exercises: exerciseReducer,
    homeConfig: homeConfigReducer,
  },
});
