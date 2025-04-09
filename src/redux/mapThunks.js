import axios from "axios";
import { setRoute, setLoadingRoute, setError } from "./mapSlice";

const accessToken = import.meta.env.VITE_AccessToken;

export const fetchDirections =
  (userPosition, selectedLocations) => async (dispatch) => {
    console.log(userPosition);
    console.log(selectedLocations);
    if (!selectedLocations || selectedLocations.length < 1) return;

    dispatch(setLoadingRoute(true));
    try {
      const waypoints = selectedLocations
        .map((coord) => `${coord[1]},${coord[0]}`)
        .join(";");
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${userPosition[1]},${userPosition[0]};${waypoints}?geometries=geojson&overview=full&steps=true&roundabout_exits=false&alternatives=false&access_token=${accessToken}`;
      const response = await axios.get(url);
      const routeCoordinates = response.data.routes[0].geometry.coordinates;
      dispatch(setRoute(routeCoordinates.map((coord) => [coord[1], coord[0]])));
    } catch (error) {
      console.log(error);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoadingRoute(false));
    }
  };
