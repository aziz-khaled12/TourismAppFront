// src/redux/likesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_LOCAL_BACK_END_URL;

// Async thunk to fetch liked items
export const fetchLikedItems = createAsyncThunk(
  "likes/fetchLikedItems",
  async ({ user, token, type }, thunkAPI) => {
    try {
      const res = await axios.get(`${url}/users/likes`, {
        params: {
          user_id: user.id,
          type: type
        },
        headers: { 
            Authorization: `Bearer ${token}`
        },
      });
      return res.data; // assuming the response contains an array of liked entity IDs
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const likesSlice = createSlice({
  name: "likes",
  initialState: {
    likedItems: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addLike: (state, action) => {
      state.likedItems.push(action.payload);
    },
    removeLike: (state, action) => {
      state.likedItems = state.likedItems.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikedItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLikedItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.likedItems = action.payload;
      })
      .addCase(fetchLikedItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addLike, removeLike } = likesSlice.actions;

export default likesSlice.reducer;
