import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import "leaflet.locatecontrol";
import L from "leaflet";
import "../../styles/LocateControl.css"; // Import the CSS file for custom styles
import { CiLocationArrow1 } from "react-icons/ci";

const customIcon = L.divIcon({
  className: "custom-icon",
  html: `
    <div class="marker-container">
      <div class="circle"></div>
      <div class="pulse"></div>
    </div>
  `,
  iconSize: [40, 40],
});

const LocateControl = ({position}) => {
  const map = useMap();
  const [clicked, setClicked] = useState(false);
  const [marker, setMarker] = useState();


  const handleClick = () => {
    const bounds = map.getBounds();

    if (!bounds.contains(position)) {
      map.flyTo(position, 15);
      if (!marker) {
        setClicked(true);
        const newMarker = L.marker(position, { icon: customIcon }).addTo(map);
        setMarker(newMarker);
      }
      return;
    }

    setClicked(!clicked);

    if (!clicked) {
      if (marker) {
        marker.remove(); 
      }
      const newMarker = L.marker(position, { icon: customIcon }).addTo(map);
      setMarker(newMarker);
      map.flyTo(position, 15);
    } else {
      if (marker) {
        marker.remove(); 
        setMarker(null); 
      }
    }
  };

  useEffect(() => {
    const newMarker = L.marker(position, { icon: customIcon }).addTo(map);
      setMarker(newMarker);
      map.flyTo(position, 17);
  },[])

  return (
    <div
      className="rounded-md p-2 text-xl text-white absolute bottom-10 right-5 bg-primary shadow-sm transition-all duration-200 hover:bg-primary/90 flex items-center justify-center cursor-pointer z-500"
      onClick={handleClick}
    >
      <CiLocationArrow1 />
    </div>
  );
};

export default LocateControl;
