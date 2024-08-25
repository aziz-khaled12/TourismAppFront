// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import likesReducer from './likesSlice';
import roomsReducer from "./hotelInterface/roomsSlice"

export const store = configureStore({
  reducer: {
    likes: likesReducer,
    rooms: roomsReducer,
  },
});