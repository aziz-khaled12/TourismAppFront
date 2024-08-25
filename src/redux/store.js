// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import likesReducer from './likesSlice';

export const store = configureStore({
  reducer: {
    likes: likesReducer,
  },
});