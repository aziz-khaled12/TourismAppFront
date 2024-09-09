import React, { useEffect, useRef, useState } from "react";
import {
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import axios from "axios";
import TruncateMarkup from "react-truncate-markup";
import { useMap } from "react-leaflet";
import { CiSearch } from "react-icons/ci";

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
            limit: 5,
          },
        }
      );
      setResults(response.data);
      console.log(response.data);
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
    <div className="z-500 top-0 px-4 py-6  w-full absolute flex items-center justify-center">
      <div ref={containerRef} className="w-[70%] max-w-[600px]">
        <TextField
          id="outlined-search"
          type="search"
          size="small"
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CiSearch className="text-2xl"/>
              </InputAdornment>
            ),
          }}
          value={query}
          sx={{
            backgroundColor: "white",
            borderRadius: "99px",
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#dfdfdf", // Border color
                borderRadius: "99px",
              },
              "&:hover fieldset": {
                borderColor: "#dfdfdf", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#dfdfdf", // Border color on focus
              },
              "& .MuiInputBase-input": {
                padding: "16px 16px 16px 0px",
              },
            },
          }}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a place"
        />
        {results.length > 0 && (
          <List
            sx={{ width: "100%", bgcolor: "white", marginTop: "8px" }}
            className="rounded-lg"
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
                      <TruncateMarkup lines={2}>
                        <span className=" !text-md ">{result.display_name}</span>
                      </TruncateMarkup>
                    }
                  />
                </ListItemButton>
              );
            })}
          </List>
        )}
      </div>
    </div>
  );
};

export default NominatimSearch;
