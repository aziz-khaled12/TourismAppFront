import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

const GeocoderControl = () => {
  const map = useMap();
  const openCageApiKey = "97d01976f74a4244a84f4d077642de7f"; // Replace with your OpenCage API key
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const geocoder = L.Control.Geocoder.opencage({
      geocodingQueryParams: {
        key: openCageApiKey,
        countrycode: "dz",
        limit: 10,
        language: "en",
      },
    });

    const geocoderControl = L.Control.geocoder({
      query: "",
      placeholder: "Search here...",
      defaultMarkGeocode: false,
      geocoder,
    }).addTo(map);

    const handleMarkGeocode = (e) => {
      const latlng = e.geocode.center;
      console.log("Geocode result:", e.geocode);
      if (latlng) {
        console.log("Flying to:", latlng);
        map.flyTo(latlng, 15, {
          animate: true,
          duration: 1.5, // Duration of animation in seconds
        });

        // Add or update marker
        if (marker) {
          marker.setLatLng(latlng);
        } else {
          const newMarker = L.marker(latlng).addTo(map);
          setMarker(newMarker);
        }
      } else {
        console.error("No latlng found in geocode result:", e.geocode);
      }
    };

    // Attach event listener
    geocoderControl.on("markgeocode", handleMarkGeocode);

    return () => {
      geocoderControl.off("markgeocode", handleMarkGeocode);
      map.removeControl(geocoderControl);
    };
  }, [map, openCageApiKey, marker]);

  return null;
};

export default GeocoderControl;
