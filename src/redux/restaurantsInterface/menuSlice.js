// src/redux/likesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_LOCAL_BACK_END_URL;

// Async thunk to fetch menu items
export const fetchMenuItems = createAsyncThunk(
  "menu/fetchMenuItems",
  async ({ restoId, token }, thunkAPI) => {
    try {
      const res = await axios.get(
        `${url}/restaurants/menu/items?id=${restoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to add menu items
export const addMenuItem = createAsyncThunk(
  "menu/addMenuItem",
  async ({ restoId, itemData, accessToken }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/restaurants/menu/items?id=${restoId}`,
        itemData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data", // Necessary for handling file uploads
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const modifyMenuItem = createAsyncThunk(
  "menu/modifyMenuItem",
  async ({ itemId, itemData, accessToken }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${url}/restaurants/menu/items?id=${itemId}`,
        itemData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data", // Necessary for handling file uploads
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteMenuItem = createAsyncThunk(
  "menu/deleteMenuItem",
  async ({ queryParams, accessToken }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${url}/restaurants/menu/items?${queryParams}`,
        {
          headers: {
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

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuItems: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.menuItems = action.payload;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addMenuItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMenuItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("action payload: ", action.payload);
        state.menuItems.push(action.payload);
      })
      .addCase(addMenuItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(modifyMenuItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(modifyMenuItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.menuItems.findIndex(menuItem => menuItem.id === action.payload.id);
        if (index !== -1) {
          state.menuItems[index] = action.payload;
        }
      })
      .addCase(modifyMenuItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteMenuItem.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.menuItems = state.menuItems.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteMenuItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export default menuSlice.reducer;
