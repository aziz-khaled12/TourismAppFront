import React from "react";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

//Get and display user location on map load
const LocateUser = () => {
  const map = useMap();

  
  useEffect(() => {
    map.locate({ setView: true });

    const onLocationFound = (e) => {
      map.setView(e.latlng, 15);
    };

    const onLocationError = (e) => {
      alert(e.message);
    };

    map.on("locationfound", onLocationFound);
    map.on("locationerror", onLocationError);

    return () => {
      map.off("locationfound", onLocationFound);
      map.off("locationerror", onLocationError);
    };
  }, [map]);

  return null;
};

export default LocateUser;