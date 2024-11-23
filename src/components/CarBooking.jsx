import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import LocateControl from "./LocateControl ";

const mapBoxToken = import.meta.env.VITE_AccessToken;

const CarBooking = () => {
  const [position, setPosition] = useState(); // Default position
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  return (
    position && (
      <MapContainer
        center={position}
        zoom={17}
        className="h-screen w-full"
        minZoom={5}
      >
        <TileLayer
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=sk.eyJ1Ijoia2hhbGVkYXppejExIiwiYSI6ImNseWhnM3FvNDA0MWgya3F5ZzVsMzRwYWEifQ.rA8VFAxykZnsT2AG1HwpsQ"
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
        />
        <LocateControl position={position} />
      </MapContainer>
    )
  );
};

export default CarBooking;
