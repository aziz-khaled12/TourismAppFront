import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

const MapTest = ({ markers }) => {
  const defaultMarkers = [
    { position: [51.505, -0.09], name: "Marker 1" },
    { position: [51.51, -0.1], name: "Marker 2" },
    { position: [51.49, -0.1], name: "Marker 3" },
  ];

  const allMarkers = markers ? [...defaultMarkers, ...markers] : defaultMarkers;

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup>
        {allMarkers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapTest;
