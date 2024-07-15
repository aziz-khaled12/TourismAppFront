import { useState } from "react";
import { useMap } from "react-leaflet";
import './SearchBox.css'

const SearchBox = () => {
    const [query, setQuery] = useState("");
    const map = useMap();
  
    const handleSearch = () => {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const { lat, lon } = data[0];
            map.flyTo([lat, lon], 13);
          } else {
            alert("Location not found");
          }
        });
    };
  
    return (
      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a location"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    );
  };