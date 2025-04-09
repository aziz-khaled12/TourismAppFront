import React, { useEffect } from "react";
import { Marker, Polyline, useMap } from "react-leaflet"; // Import useMap to access the map instance
import { useDispatch, useSelector } from "react-redux";
import { fetchDirections } from "../../redux/mapThunks";

const RouteLayer = () => {
  const map = useMap();
  const dispatch = useDispatch();
  const { userPosition, route, selectedLocations } = useSelector((state) => state.map);

  useEffect(() => {
    if (route.length > 0) {
      const bounds = L.latLngBounds(route);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [route, map]);

  useEffect(() => {
    userPosition &&
      dispatch(
        fetchDirections([userPosition.lat, userPosition.lon], selectedLocations)
      );
  }, [selectedLocations]);

  // Render the route and markers
  return (
    <>
      <Polyline positions={route} color="blue" weight={3} opacity={0.7} />
      {selectedLocations.map((location, index) => (
        <Marker key={index} position={location} />
      ))}
    </>
  );
};
export default RouteLayer;
