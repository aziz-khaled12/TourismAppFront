// MarkersLayer.jsx
import React, { useMemo } from "react";
import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useDispatch } from "react-redux";
import { addLocation } from "../../redux/mapSlice";
import LocationCard from "./LocationCard";
import { createCustomMarkerIcon, createCustomClusterIcon } from "./MapUtils";

const MarkersLayer = ({ hotels, restaurants, places, selectedFilters }) => {
  const dispatch = useDispatch();
  const customMarkerIcon = useMemo(() => createCustomMarkerIcon(), []);

  const renderMarkers = (locations, type) => {
    if (!selectedFilters.includes(type)) return null;
    
    return (
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={(cluster) => createCustomClusterIcon(cluster, type)}
      >
        {locations.map((location, index) => (
          <Marker
            position={[location.lat, location.lon]}
            key={`${type}-${index}`}
            icon={customMarkerIcon}
          >
            <Popup>
              <div onClick={() => dispatch(addLocation([[location.lat, location.lon]]))}>
                <LocationCard location={location} num={234} />
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    );
  };

  return (
    <>
      {renderMarkers(hotels, "Hotels")}
      {renderMarkers(restaurants, "Restaurants")}
      {renderMarkers(places, "Places")}
    </>
  );
};

export default MarkersLayer;