import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import LocateControl from "../Map/LocateControl";

const mapBoxToken = import.meta.env.VITE_AccessToken;

const CarBooking = () => {
  const position = useSelector((state) => state.map.position);

  return (
    position && (
      <MapContainer
        center={position}
        zoom={17}
        className="h-screen w-full"
        minZoom={5}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapBoxToken}`}
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
        />
        <LocateControl position={position} />
      </MapContainer>
    )
  );
};

export default CarBooking;
