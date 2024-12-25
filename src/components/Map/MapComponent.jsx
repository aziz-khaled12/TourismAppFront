import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import LocateControl from "./LocateControl ";
import "react-leaflet-markercluster/dist/styles.min.css";
import HotelCard from "./HotelCard";
import NominatimSearch from "./NominatimSearch";
import { GetHotels } from "../../datafetch/hotels";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "../Navigation/Navbar";
import { GetPlaces } from "../../datafetch/locations";
import { GetRestaurants } from "../../datafetch/restaurants";

const mapBoxToken = import.meta.env.VITE_AccessToken;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
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
  const [position, setPosition] = useState(); // Default position
  const [route, setRoute] = useState([]); // Route state for directions

  const fetchDirections = async (start, end) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[1]},${start[0]};${end[1]},${end[0]}?geometries=geojson&overview=full&access_token=${mapBoxToken}`;

    try {
      const response = await axios.get(url);
      const routeCoordinates = response.data.routes[0].geometry.coordinates;
      const latLngs = routeCoordinates.map((coord) => [coord[1], coord[0]]);
      setRoute(latLngs); // Update route with the polyline coordinates
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
        if (destinationLat && destinationLon) {
          const destination = [
            parseFloat(destinationLat),
            parseFloat(destinationLon),
          ];
          fetchDirections(
            [position.coords.latitude, position.coords.longitude],
            destination
          );
        }
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, [destinationLat, destinationLon]);

  const fetchHotels = async () => {
    await GetHotels(setHotels, accessToken);
  };

  const fetchPlaces = async () => {
    await GetPlaces(setPlaces, accessToken);
  };

  const fetchRestaurants = async () => {
    await GetRestaurants(setRestaurants, accessToken);
  };

  useEffect(() => {
    fetchHotels();
    fetchPlaces();
    fetchRestaurants();
  }, []);

  return (
    position && (
      <MapContainer
        zoomControl={false}
        center={position}
        zoom={17}
        className="h-screen w-full"
        minZoom={5}
      >
        <TileLayer
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=sk.eyJ1Ijoia2hhbGVkYXppejExIiwiYSI6ImNseWhnM3FvNDA0MWgya3F5ZzVsMzRwYWEifQ.rA8VFAxykZnsT2AG1HwpsQ"
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
        />

        {/* <LayersControl position="topleft">
          <LayersControl.BaseLayer checked name="Mapbox Streets">
            <TileLayer
              url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=sk.eyJ1Ijoia2hhbGVkYXppejExIiwiYSI6ImNseWhnM3FvNDA0MWgya3F5ZzVsMzRwYWEifQ.rA8VFAxykZnsT2AG1HwpsQ"
              attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Mapbox Satellite">
            <TileLayer
              url="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=sk.eyJ1Ijoia2hhbGVkYXppejExIiwiYSI6ImNseWhnM3FvNDA0MWgya3F5ZzVsMzRwYWEifQ.rA8VFAxykZnsT2AG1HwpsQ"
              attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>
        </LayersControl> */}

        <LocateControl position={position} />

        {selectedFilters.includes("Hotels") && (
          <MarkerClusterGroup>
            {hotels.length > 0 &&
              hotels.map((hotel, index) => {
                return (
                  <Marker position={[hotel.lat, hotel.lon]} key={index}>
                    <Popup>
                      <HotelCard hotel={hotel} num={234} />
                    </Popup>
                  </Marker>
                );
              })}
          </MarkerClusterGroup>
        )}

        {selectedFilters.includes("Restaurants") && (
          <MarkerClusterGroup>
            {hotels.length > 0 &&
              hotels.map((hotel, index) => {
                return (
                  <Marker position={[hotel.lat, hotel.lon]} key={index}>
                    <Popup>
                      <HotelCard hotel={hotel} num={234} />
                    </Popup>
                  </Marker>
                );
              })}
          </MarkerClusterGroup>
        )}

        {selectedFilters.includes("places") && (
          <MarkerClusterGroup>
            {hotels.length > 0 &&
              hotels.map((hotel, index) => {
                return (
                  <Marker position={[hotel.lat, hotel.lon]} key={index}>
                    <Popup>
                      <HotelCard hotel={hotel} num={234} />
                    </Popup>
                  </Marker>
                );
              })}
          </MarkerClusterGroup>
        )}

        {route.length > 0 && (
          <>
            {" "}
            <Polyline
              positions={route}
              color="blue"
              weight={3}
              opacity={0.7}
            />{" "}
            <Marker position={[destinationLat, destinationLon]} />
          </>
        )}
        <NominatimSearch
          setSelectedFilters={setSelectedFilters}
          selectedFilters={selectedFilters}
        />
      </MapContainer>
    )
  );
};

export default MapComponent;
