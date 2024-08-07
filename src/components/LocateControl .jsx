import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import "leaflet.locatecontrol";

const LocateControl = () => {
  const map = useMap();

  useEffect(() => {
    const locateControl = L.control.locate({
      position: "bottomright",
      setView: "once",
      keepCurrentZoomLevel: true,
      drawCircle: false,
      flyTo: true,
      showPopup: false,
      showCompass: true,
    });
    locateControl.addTo(map);

  }, [map]);

  return null;
};

export default LocateControl;
