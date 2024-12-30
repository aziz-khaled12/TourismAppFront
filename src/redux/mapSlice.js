import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userPosition: null,
  selectedLocations: [],
  route: [],
  hotels: [],
  restaurants: [],
  places: [],
  selectedFilters: [],
  isDragging: false,
  zoom: 17,
  isLoadingRoute: false,
  error: null
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setUserPosition: (state, action) => {
      state.userPosition = action.payload;
    },
    addLocation: (state, action) => {
      state.selectedLocations.push(...action.payload);
    },
    removeLocation: (state, action) => {
        state.selectedLocations = state.selectedLocations.filter(
          (_, index) => !action.payload.includes(index)
        );
    },
    setRoute: (state, action) => {
      state.route = action.payload;
    },
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },
    setRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },
    setPlaces: (state, action) => {
      state.places = action.payload;
    },
    toggleFilter: (state, action) => {
      const filter = action.payload;
      const index = state.selectedFilters.indexOf(filter);
      if (index === -1) {
        state.selectedFilters.push(filter);
      } else {
        state.selectedFilters.splice(index, 1);
      }
    },
    setDragging: (state, action) => {
      state.isDragging = action.payload;
    },
    setZoom: (state, action) => {
      state.zoom = action.payload;
    },
    setLoadingRoute: (state, action) => {
      state.isLoadingRoute = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetMap: (state) => {
      return initialState;
    }
  }
});

export const {
  setUserPosition,
  addLocation,
  removeLocation,
  setRoute,
  setHotels,
  setRestaurants,
  setPlaces,
  toggleFilter,
  setDragging,
  setZoom,
  setLoadingRoute,
  setError,
  resetMap
} = mapSlice.actions;

export default mapSlice.reducer;