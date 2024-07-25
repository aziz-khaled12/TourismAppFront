import React, { useEffect, useRef, useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { FixedSizeList } from "react-window";
import axios from "axios";
import { useMap } from "react-leaflet";

const NominatimSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const map = useMap();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: query,
            countrycodes: "dz",
            format: "json",
            addressdetails: 1,
            limit: 10,
          },
        }
      );
      setResults(response.data);
    };

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(handleSearch, 500); // 500ms debounce delay

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [query]);
  const handleResultClick = (lat, lon) => {
    setResults([]);
    map.flyTo([lat, lon], 17);
    L.marker([lat, lon]).addTo(map);
  };

  useEffect(() => {
    console.log(results);
  }, [results]);

  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setResults([]); // Clear results when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute top-0 right-0 mt-4 mr-4 z-500 ">
      <TextField
        id="outlined-search"
        type="search"
        size="small"
        value={query}
        className="!bg-gray-50 !rounded-lg !w-[246px]"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a place"
      />

      {results.length > 0 && (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          className="!mt-2 rounded-lg !w-[246px]"
        >
          {results.map((result, index) => {
            return (
              <ListItemButton
                key={index}
                onClick={() => {
                  handleResultClick(result.lat, result.lon);
                }}
              >
                <ListItemText
                  primary={
                    <span className=" !text-xs">{result.display_name}</span>
                  }
                />
              </ListItemButton>
            );
          })}
        </List>
      )}
    </div>
  );
};

export default NominatimSearch;
