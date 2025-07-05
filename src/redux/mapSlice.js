import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getUserLocation = createAsyncThunk(
  "map/getUserLocation",
  async (_, thunkAPI) => {
    try {
     
      // Get location
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;

      // Reverse geocode location (fetch address)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const locationData = await response.json();

      const currentLocation = {
        display_name: locationData.display_name,
        lat: latitude,
        lon: longitude,
      };

      console.log(currentLocation);
      return currentLocation;
    } catch (error) {
      console.error("Error getting location:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userPosition: null,
  status: "idle",
  selectedLocations: [],
  route: [],
  hotels: [],
  restaurants: [],
  places: [],
  selectedFilters: [],
  isDragging: false,
  zoom: 17,
  isLoadingRoute: false,
  error: null,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setUserPosition: (state, action) => {
      state.userPosition = action.payload;
    },
    addLocation: (state, action) => {
      state.selectedLocations = [];
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserLocation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserLocation.fulfilled, (state, action) => {
        state.status = "succeded";
        state.userPosition = action.payload;
      })
      .addCase(getUserLocation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
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
  resetMap,
} = mapSlice.actions;

export default mapSlice.reducer;
