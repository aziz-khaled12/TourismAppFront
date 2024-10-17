// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import likesReducer from './likesSlice';
import roomsReducer from "./hotelInterface/roomsSlice"
import bookingReducer from './hotelInterface/bookingSlice';
import menuReducer from './restaurantsInterface/menuSlice';
import alertReducer from './alertSlice'
import selectedTabReducer from './selectedTabSlice';

export const store = configureStore({
  reducer: {
    likes: likesReducer,
    rooms: roomsReducer,
    bookings: bookingReducer,
    menu: menuReducer,
    selectedTab: selectedTabReducer, 
    alert: alertReducer
  },
});