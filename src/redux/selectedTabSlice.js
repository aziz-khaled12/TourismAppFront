import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: "Home",       // Default tab
  wilaya: "Guelma",        // Default wilaya (could be set to a specific wilaya or empty string)
};

const selectedTabSlice = createSlice({
  name: "selectedTab",
  initialState,
  reducers: {
    setSelectedTab: (state, action) => {
      state.tab = action.payload;
    },
    setWilaya: (state, action) => {
      state.wilaya = action.payload;
    },
  },
});

export const { setSelectedTab, setWilaya } = selectedTabSlice.actions;
export default selectedTabSlice.reducer;
