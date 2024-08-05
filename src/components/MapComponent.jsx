import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import LocateControl from "./LocateControl ";
import LocateUser from "./LocateUser";
import "react-leaflet-markercluster/dist/styles.min.css";
import HotelCard from "./HotelCard";
import NominatimSearch from "./NominatimSearch";
import { GetHotels } from "../datafetch/hotels";
import { useAuth } from "../context/AuthContext";
import { GetRestaurants } from "../datafetch/restaurants";

const MapComponent = () => {
  const [hotels, setHotels] = useState([]);
  const { accessToken } = useAuth();

  const fetchHotels = async () => {
    await GetHotels(setHotels, accessToken);
  };

  useEffect(() => {
    fetchHotels();
  }, []);
  return (
    <MapContainer
      center={[36.7372, 3.0869]}
      zoom={17}
      className="h-screen w-full"
      minZoom={5}
    >
      <LayersControl position="topleft">
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
      </LayersControl>

      <LocateUser />
      <LocateControl />
      <MarkerClusterGroup>
        {hotels.length > 0 &&
          hotels.map((hotel, index) => {
            return (
              <Marker position={[hotel.lat, hotel.lon]} key={index}>
                <Popup>
                  <HotelCard
                    name={hotel.name}
                    address={hotel.road}
                    rating={hotel.rating}
                    num={234}
                  />
                </Popup>
              </Marker>
            );
          })}
      </MarkerClusterGroup>
      <NominatimSearch />
    </MapContainer>
  );
};

export default MapComponent;
