import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_LOCAL_BACK_END_URL;

export const fetchBookings = createAsyncThunk(
  "rooms/fetchBookings",
  async ({ hotelId, accessToken }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${url}/interactions/bookings?hotel_id=${hotelId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addBooking = createAsyncThunk(
  "rooms/addBooking",
  async ({ bookingData, accessToken }, { rejectWithValue }) => {
    console.log("booking data: ", bookingData);
    try {
      const response = await axios.post(
        `${url}/interactions/booking`,
        bookingData,
        {
          headers: {
            'Content-Type': 'application/json', // Important: JSON content type
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "rooms/deleteBooking",
  async ({ booking_id, accessToken }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${url}/interactions/bookings?booking_id=${booking_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) throw new Error(response.statusText);
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addBooking.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings.push(action.payload);
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteBooking.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = state.bookings.filter(
          (booking) => booking.id !== action.payload.booking[0].id
        );
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
