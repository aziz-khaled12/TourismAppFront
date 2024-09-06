import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = import.meta.env.VITE_LOCAL_BACK_END_URL;

// Async thunks for fetching, adding, deleting, and modifying rooms
export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async ({hotelId, accessToken}, { rejectWithValue }) => {

    try {
      const response = await axios.get(`${url}/hotels/rooms/${hotelId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addRoom = createAsyncThunk(
  'rooms/addRoom',
  async ({ roomData, accessToken }, { rejectWithValue }) => {

    try {
      const response = await fetch(`${url}/hotels/room`, {
        method: 'POST',
        body: roomData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) throw new Error(response.statusText);
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRoom = createAsyncThunk(
  'rooms/deleteRoom',
  async ({ roomId, queryParams, accessToken }, { rejectWithValue }) => {

    try {
      const response = await fetch(`${url}/hotels/room/${roomId}?${queryParams}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) throw new Error(response.statusText);
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const modifyRoom = createAsyncThunk(
  'rooms/modifyRoom',
  async ({ roomId, roomData, accessToken }, {  rejectWithValue }) => {

    try {
      const response = await fetch(`${url}/hotels/room/${roomId}`, {
        method: 'PUT',
        body: roomData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) throw new Error(response.statusText);
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addRoom.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rooms.push(action.payload);
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteRoom.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rooms = state.rooms.filter(room => room.id !== action.payload.rooms[0].id);
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(modifyRoom.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(modifyRoom.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.rooms.findIndex(room => room.id === action.payload.id);
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
      })
      .addCase(modifyRoom.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default roomsSlice.reducer;
