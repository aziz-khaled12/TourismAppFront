import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { GetPlaces } from "../../datafetch/locations";
import { GetHotels } from "../../datafetch/hotels";
import { GetRestaurants } from "../../datafetch/restaurants";
import axios from "axios";
import NominatimSearch from "./NominatimSearch";
import LocationCard from "./LocationCard";

import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import LocateControl from "./LocateControl ";

const mapBoxToken = import.meta.env.VITE_AccessToken;
const MAPBOX_TILE_URL = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=sk.eyJ1Ijoia2hhbGVkYXppejExIiwiYSI6ImNseWhnM3FvNDA0MWgya3F5ZzVsMzRwYWEifQ.rA8VFAxykZnsT2AG1HwpsQ`;

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const MapComponent = () => {
  const query = useQuery();
  const destinationLat = query.get("lat");
  const destinationLon = query.get("lon");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const currentTab = useSelector((state) => state.selectedTab.tab);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [places, setPlaces] = useState([]);
  const { accessToken } = useAuth();
  const [position, setPosition] = useState();
  const [route, setRoute] = useState([]);

  const fetchDirections = useCallback(async (start, end) => {
    try {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[1]},${start[0]};${end[1]},${end[0]}?geometries=geojson&overview=full&access_token=${mapBoxToken}`;
      const response = await axios.get(url);
      const routeCoordinates = response.data.routes[0].geometry.coordinates;
      setRoute(routeCoordinates.map((coord) => [coord[1], coord[0]]));
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  }, []);

  useEffect(() => {
    const getCurrentPosition = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setPosition(currentPosition);

          if (destinationLat && destinationLon) {
            const destination = [
              parseFloat(destinationLat),
              parseFloat(destinationLon),
            ];
            fetchDirections(currentPosition, destination);
          }
        },
        (error) => console.error("Error getting location:", error)
      );
    };

    getCurrentPosition();
  }, [destinationLat, destinationLon, fetchDirections]);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        GetHotels(setHotels, accessToken),
        GetPlaces(setPlaces, accessToken),
        GetRestaurants(setRestaurants, accessToken),
      ]);
    };

    fetchData();
  }, [accessToken]);

  const renderMarkers = useCallback((locations, type) => {
    if (!selectedFilters.includes(type)) return null;

    return (
      <MarkerClusterGroup>
        {locations.map((location, index) => (
          <Marker position={[location.lat, location.lon]} key={`${type}-${index}`}>
            <Popup>
              <LocationCard location={location} num={234} />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    );
  }, [selectedFilters]);

  const routeLayer = useMemo(() => {
    if (route.length === 0) return null;
    return (
      <>
        <Polyline positions={route} color="blue" weight={3} opacity={0.7} />
        <Marker position={[destinationLat, destinationLon]} />
      </>
    );
  }, [route, destinationLat, destinationLon]);

  if (!position) return null;

  return (
    <MapContainer
      zoomControl={false}
      center={position}
      zoom={17}
      className="h-screen w-full"
      minZoom={5}
    >
      <TileLayer
        url={MAPBOX_TILE_URL}
        attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
      />

      <LocateControl position={position} />
      
      {renderMarkers(hotels, "Hotels")}
      {renderMarkers(restaurants, "Restaurants")}
      {renderMarkers(places, "places")}
      {routeLayer}

      <NominatimSearch
        setSelectedFilters={setSelectedFilters}
        selectedFilters={selectedFilters}
      />
    </MapContainer>
  );
};

export default MapComponent;