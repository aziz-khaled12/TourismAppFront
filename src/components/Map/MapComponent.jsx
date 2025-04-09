// Main MapComponent.jsx file
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer } from "react-leaflet";
import { getUserLocation } from "../../redux/mapSlice";
import { OneEightyRingWithBg } from "react-svg-spinners";
import { fetchAllLocationData } from "./MapUtils";
import MapControls from "./MapControls";
import MarkersLayer from "./MarkersLayer";
import RouteLayer from "./RouteLayer";
import MapTopContainer from "./MapTopContainer";
import Planner from "./Planner";
import LocateControl from "./LocateControl";
import CarBooking from "./CarBooking";
import { useAuth } from "../../context/AuthContext";

const mapBoxToken = import.meta.env.VITE_AccessToken;
const MAPBOX_TILE_URL = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapBoxToken}`;

const MapComponent = () => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  
  useEffect(() => {
    dispatch(getUserLocation());
  }, []);

  const {
    userPosition,
    status,
    hotels,
    restaurants,
    places,
    selectedFilters,
    isDragging,
  } = useSelector((state) => state.map);
  
  const { accessToken } = useAuth();
  
  // Fetch location data
  useEffect(() => {
    if (accessToken) {
      fetchAllLocationData(dispatch, accessToken);
    }
  }, [dispatch, accessToken]);

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col m-auto">
        <OneEightyRingWithBg className="!text-primary" />
      </div>
    );
  }
  
  if (status === "failed") {
    return (
      <div className="h-screen w-full flex center justify-center items-center text-center text-2xl font-semibold">
        An Error have occured please check location and try again
      </div>
    );
  }

  return (
    status === "succeded" &&
    <div className="relative h-screen w-full">
      <MapContainer
        ref={mapRef}
        zoomControl={false}
        center={[userPosition.lat, userPosition.lon]}
        zoom={17}
        className="h-full w-full"
        minZoom={5}
        dragging={!isDragging}
      >
        <TileLayer
          url={MAPBOX_TILE_URL}
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
        />
        <MapControls isDragging={isDragging} />
        <MarkersLayer 
          hotels={hotels}
          restaurants={restaurants}
          places={places}
          selectedFilters={selectedFilters}
        />
        <RouteLayer />
        <MapTopContainer />
        <Planner />
        <LocateControl />
        <CarBooking />
      </MapContainer>
    </div>
  );
};

export default MapComponent;