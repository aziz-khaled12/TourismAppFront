import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import GeocoderControl from "./GeocoderControl";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import LocateControl from "./LocateControl ";
import LocateUser from "./LocateUser";
import HotelMarkers from "./HotelMarkers";
import MarkerClusterGroup from "react-leaflet-markercluster";

const fetchHotels = async () => {
  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: `
        [out:json];
        area["ISO3166-1"="DZ"][admin_level=2];
        node["tourism"="hotel"](area);
        out body;
      `,
  });
  const data = await response.json();
  return data.elements;
};

const MapComponent = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotels().then((data) => {
      const filteredHotels = data.filter((hotel) => {
        return hotel.tags && hotel.tags["addr:street"] && hotel.tags.name;
      });
      setHotels(filteredHotels);
    });
  }, []);

  useEffect(() => {
    console.log("hotels: ", hotels);
  }, [hotels]);

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
      {hotels.length > 0 && <HotelMarkers hotels={hotels} />}
      {/* Add the GeocoderControl component */}
      <GeocoderControl />
    </MapContainer>
  );
};

export default MapComponent;
