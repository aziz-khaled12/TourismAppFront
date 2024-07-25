import React, { useEffect, useRef, useState } from "react";
import { List, ListItemButton, ListItemText, TextField } from "@mui/material";

const GeocoderComponent = ({data, type}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const handleSearch = () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      const filteredData = data.filter((instance) =>
        instance.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredData);
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
  }, [query, data]);

  const handleResultClick = () => {
    setResults([]);
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
    <div ref={containerRef} className="w-full h-full ">
      <TextField
        id="outlined-search"
        type="search"
        value={query}
        className="!bg-gray-50 !rounded-lg !w-full"
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search for a ${type}`}
      />

      {results.length > 0 && (
        <List
          sx={{ width: "100%", maxWidth: 360 }}
          className="!mt-2 rounded-lg !w-full !bg-secondary"
        >
          {results.map((result, index) => (
            <ListItemButton
              key={index}
              onClick={() => handleResultClick(result)}
            >
              <ListItemText
                primary={<span className="!text-xs">{result.name}</span>}
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </div>
  );
};

export default GeocoderComponent;
