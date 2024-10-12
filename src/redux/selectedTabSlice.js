import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: "Home",
};

const selectedTabSlice = createSlice({
  name: "selectedTab",
  initialState,
  reducers: {
    setSelectedTab: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { setSelectedTab } = selectedTabSlice.actions;
export default selectedTabSlice.reducer;
