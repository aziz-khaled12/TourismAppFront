import React, { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import HotelCard from "./HotelCard";
import markerIcon from "../assets/pin.png";
import MarkerClusterGroup from "./MarkerClusterGroup";
import ReactDOMServer from "react-dom/server";
import Rating from "@mui/material/Rating";

const HotelMarkers = (hotels) => {
  // Create a custom icon
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [28, 28],
  });

  const map = useMap();

  const handleMarkerClick = (position) => {
    map.flyTo(position, 18);
  };

  const markers = hotels.hotels.map((hotel) => {
    const marker = L.marker([hotel.lat, hotel.lon], { icon: customIcon });

    marker.on("click", () => {
      handleMarkerClick([hotel.lat, hotel.lon]);
    });

    marker.on("popupopen", () => {
      const popupContent = document.createElement("div");
      popupContent.className = "popup-content";
      popupContainerRef.current = popupContent;

      ReactDOM.render(
        <HotelCard
          name={hotel.tags.name}
          address={hotel.tags["addr:street"]}
          rating={4.5}
          num={234}
        />,
        popupContent
      );

      marker.setPopupContent(popupContent);
    });

    return marker;
  });

  useEffect(() => {
    console.log("markers: ", markers);
  }, [markers]);

  return (
    <>
      <MarkerClusterGroup markers={markers} />
    </>
  );
};

export default HotelMarkers;
