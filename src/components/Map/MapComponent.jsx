import React, { useEffect, useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useLocation } from "react-router-dom";
import { GetPlaces } from "../../datafetch/locations";
import { GetHotels } from "../../datafetch/hotels";
import { GetRestaurants } from "../../datafetch/restaurants";
import NominatimSearch from "./NominatimSearch";
import LocationCard from "./LocationCard";
import hotelMarker from "../../assets/hotelMarker.png";
import placesIconSVG from "../../assets/attractionsSVG.svg";
import L from "leaflet";
import { useAuth } from "../../context/AuthContext";
import {
  setUserPosition,
  addLocation,
  setHotels,
  setRestaurants,
  setPlaces,
  setDragging,
} from "../../redux/mapSlice";
import { fetchDirections } from "../../redux/mapThunks";
import Planner from "./Planner";
import LocateControl from "./LocateControl";

const mapBoxToken = import.meta.env.VITE_AccessToken;
const MAPBOX_TILE_URL = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapBoxToken}`;

// SVG icons definitions remain the same...
const { hotelIconSVG, restaurantIconSVG } = {
  hotelIconSVG: `<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M0 32C0 14.3 14.3 0 32 0L480 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 384c17.7 0 32 14.3 32 32s-14.3 32-32 32l-176 0 0-48c0-26.5-21.5-48-48-48s-48 21.5-48 48l0 48L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32L32 64C14.3 64 0 49.7 0 32zm96 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM240 96c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM112 192c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM328 384c13.3 0 24.3-10.9 21-23.8c-10.6-41.5-48.2-72.2-93-72.2s-82.5 30.7-93 72.2c-3.3 12.8 7.8 23.8 21 23.8l144 0z"/></svg>`,
  restaurantIconSVG: `<svg xmlns="http://www.w3.org/2000/svg" height="22" width="19.25" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M416 0C400 0 288 32 288 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 0-112 0-208c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7L80 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16l0 134.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8L64 16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"/></svg>`,
};

const MapControls = ({ isDragging }) => {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    isDragging ? map.dragging.disable() : map.dragging.enable();
    return () => map.dragging.enable();
  }, [map, isDragging]);

  return null;
};

const MapComponent = () => {
  const dispatch = useDispatch();
  const {
    userPosition,
    route,
    hotels,
    restaurants,
    places,
    selectedFilters,
    isDragging,
    selectedLocations,
  } = useSelector((state) => state.map);

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const destinationLat = query.get("lat");
  const destinationLon = query.get("lon");
  const { accessToken } = useAuth();
  const mapRef = useRef(null);

  const customMarkerIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: hotelMarker,
        iconAnchor: [22, 41],
        popupAnchor: [1, -34],
      }),
    []
  );

  const createCustomClusterIcon = useCallback((cluster, type) => {
    const count = cluster.getChildCount();
    const color = count < 10 ? "#0578f7" : count < 20 ? "#FCC30A" : "#F00D05";
    const icon =
      type === "Hotels"
        ? hotelIconSVG
        : type === "Restaurants"
        ? restaurantIconSVG
        : placesIconSVG;

    return L.divIcon({
      html: `
        <div class="relative w-full h-full">
          <div class="absolute inset-0 -z-[1] m-auto opacity-75 animate-ping-slow w-[70%] h-[70%] rounded-lg" style="background-color: ${color}"></div>
          <div class="flex flex-col items-center justify-center w-full h-full rounded-lg" style="background-color: ${color}">
            <span class="font-bold text-white text-sm">${count}</span>
            ${
              type === "Places"
                ? `<img src="${icon}" class="w-full h-full"/>`
                : icon
            }
          </div>
        </div>
      `,
      className: "custom-marker-cluster",
      iconSize: L.point(50, 50),
      iconAnchor: L.point(20, 20),
    });
  }, []);

  useEffect(() => {
    if (accessToken) {
      Promise.all([
        GetHotels((hotels) => dispatch(setHotels(hotels)), accessToken),
        GetPlaces((places) => dispatch(setPlaces(places)), accessToken),
        GetRestaurants(
          (restaurants) => dispatch(setRestaurants(restaurants)),
          accessToken
        ),
      ]).catch((error) => console.error("Error fetching data:", error));
    }
  }, [dispatch, accessToken]);

  const renderMarkers = useCallback(
    (locations, type) => {
      if (!selectedFilters.includes(type)) return null;
      return (
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={(cluster) =>
            createCustomClusterIcon(cluster, type)
          }
        >
          {locations.map((location, index) => (
            <Marker
              position={[location.lat, location.lon]}
              key={`${type}-${index}`}
              icon={customMarkerIcon}
            >
              <Popup>
                <div
                  onClick={() =>
                    dispatch(addLocation([location.lat, location.lon]))
                  }
                >
                  <LocationCard location={location} num={234} />
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      );
    },
    [selectedFilters, createCustomClusterIcon, customMarkerIcon, dispatch]
  );

  const routeLayer = useMemo(() => {
    console.log(selectedLocations);
    if (route.length === 0) return null;
    return (
      <>
        <Polyline positions={route} color="blue" weight={3} opacity={0.7} />
        {selectedLocations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
        {destinationLat && destinationLon && (
          <Marker position={[destinationLat, destinationLon]} />
        )}
      </>
    );
  }, [route, destinationLat, destinationLon]);

  useEffect(() => {
    dispatch(fetchDirections(userPosition, selectedLocations));
  }, [selectedLocations]);

  if (!userPosition) return null;

  return (
    <div className="relative h-screen w-full">
      <MapContainer
        ref={mapRef}
        zoomControl={false}
        center={userPosition}
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
        {renderMarkers(hotels, "Hotels")}
        {renderMarkers(restaurants, "Restaurants")}
        {renderMarkers(places, "Places")}
        {routeLayer}
        <NominatimSearch
          selectedFilters={selectedFilters}
          setIsDragging={(value) => dispatch(setDragging(value))}
        />
        <Planner />
        <LocateControl />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
