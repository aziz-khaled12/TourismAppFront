import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_LOCAL_BACK_END_URL;



// Async thunk to fetch menu orders
export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async ({ restoId, token }, thunkAPI) => {
      try {
        const res = await axios.get(
          `${url}/restaurants/orders?id=${restoId}`,
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
  
  // Async thunk to add menu orders
  export const addOrder = createAsyncThunk(
    "orders/addOrder",
    async ({ restoId, orderData, accessToken }, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${url}/restaurants/orders?id=${restoId}`,
          orderData,
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
  
  export const modifyOrder = createAsyncThunk(
    "orders/modifyOrder",
    async ({ orderId, orderData, accessToken }, { rejectWithValue }) => {
      try {
        const response = await axios.put(
          `${url}/restaurants/orders?id=${orderId}`,
          orderData,
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


  export const deleteOrder = createAsyncThunk(
    "orders/deleteOrder",
    async ({ queryParams, accessToken }, { rejectWithValue }) => {
      try {
        const response = await axios.delete(
          `${url}/restaurants/orders?${queryParams}`,
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

export const ordersSlice = createSlice({
    name: "orders",
    initialState: {
      orders: [],
      status: "idle",
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchOrders.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchOrders.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.orders = action.payload;
        })
        .addCase(fetchOrders.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(addOrder.pending, (state) => {
          state.status = "loading";
        })
        .addCase(addOrder.fulfilled, (state, action) => {
          state.status = "succeeded";
          console.log("action payload: ", action.payload);
          state.orders.push(action.payload);
        })
        .addCase(addOrder.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(modifyOrder.pending, (state) => {
          state.status = "loading";
        })
        .addCase(modifyOrder.fulfilled, (state, action) => {
          state.status = "succeeded";
          const index = state.orders.findIndex(menuItem => menuItem.id === action.payload.id);
          if (index !== -1) {
            state.orders[index] = action.payload;
          }
        })
        .addCase(modifyOrder.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(deleteOrder.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.orders = state.orders.filter(order => order.id !== action.payload.id);
        })
        .addCase(deleteOrder.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
    },
  });
  
  export default ordersSlice.reducer;
  