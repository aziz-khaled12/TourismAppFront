// MapControls.jsx
import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapControls = ({ isDragging }) => {
  const map = useMap();
  
  useEffect(() => {
    if (!map) return;
    
    isDragging ? map.dragging.disable() : map.dragging.enable();
    
    return () => map.dragging.enable();
  }, [map, isDragging]);
  
  return null;
};

export default MapControls;