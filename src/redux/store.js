// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import likesReducer from './likesSlice';
import roomsReducer from "./hotelInterface/roomsSlice"
import bookingReducer from './hotelInterface/bookingSlice';
import menuReducer from './restaurantsInterface/menuSlice';
import alertReducer from './alertSlice'

export const store = configureStore({
  reducer: {
    likes: likesReducer,
    rooms: roomsReducer,
    bookings: bookingReducer,
    menu: menuReducer, 
    alert: alertReducer
  },
});