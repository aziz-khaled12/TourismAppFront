import React, { useRef, useCallback } from "react";
import { useMap } from "react-leaflet";
import GeoSearch from "./GeoSearch";
import { useDispatch } from "react-redux";
import { setDragging } from "../../redux/mapSlice";

const MapSearch = ({ onResultsChange }) => {
  const map = useMap();
  const markersRef = useRef([]);
  const dispatch = useDispatch()


  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
  }, []);

  const handleLocationSelect = useCallback(
    (result) => {
      clearMarkers();
      const marker = L.marker([result.lat, result.lon]);
      marker.addTo(map);
      markersRef.current.push(marker);
      map.flyTo([result.lat, result.lon], 17);
    },
    [map, clearMarkers]
  );

  return (
    <GeoSearch
      className="w-full"
      onLocationSelect={handleLocationSelect}
      onResultsChange={onResultsChange}
      onTouchStart={() => dispatch(setDragging(true))}
      onTouchEnd={() => dispatch(setDragging(false))}
    />
  );
};

export default MapSearch;
