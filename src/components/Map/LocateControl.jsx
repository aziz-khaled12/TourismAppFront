import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import "leaflet.locatecontrol";
import L from "leaflet";
import "../../styles/LocateControl.css"; // Import the CSS file for custom styles
import { MdMyLocation } from "react-icons/md";
import { setDragging } from "../../redux/mapSlice";
import { useDispatch, useSelector } from "react-redux";

const customIcon = L.divIcon({
  className: "custom-icon",
  html: `
  
      <div class="marker-container">
        <div class="absolute inset-0 -z-[1] m-auto opacity-75 animate-ping w-[100%] h-[100%] rounded-full bg-[#007bff]"></div>
        <div class="circle""></div>
      </div>

  `,
  iconSize: [12, 12],
});

const LocateControl = () => {
  const map = useMap();
  const dispatch = useDispatch();
  const { userPosition } = useSelector((state) => state.map);
  const position = [userPosition.lat, userPosition.lon];
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
  }, []);


  return (
    <div
      onTouchStart={() => dispatch(setDragging(true))}
      onTouchEnd={() => dispatch(setDragging(false))}
      className="p-3 text-2xl text-green-700 absolute bottom-[120px] sm:bottom-8 shadow-custom right-5 bg-background rounded-full transition-all duration-200 hover:bg-green-700 hover:text-background flex items-center justify-center cursor-pointer z-500"
      onClick={handleClick}
    >
      <MdMyLocation />
    </div>
  );
};

export default LocateControl;
