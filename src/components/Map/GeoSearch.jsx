import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import TruncateMarkup from "react-truncate-markup";
import { CiSearch } from "react-icons/ci";
import { DEBOUNCE_DELAY, searchService } from "./consts";
import { MdLocationOn } from "react-icons/md";
import { useSelector } from "react-redux";

const GeoSearch = ({
  value = "",
  onLocationSelect,
  onResultsChange,
  onFocus,
  className,
  size = "medium",
  currentLocation = false,
  inputProps = {},
  showList = true,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [results, setResults] = useState([]);
  const containerRef = useRef(null);
  const debounceTimeoutRef = useRef(null);
  const { userPosition } = useSelector((state) => state.map);

  // Sync local value with parent value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      onResultsChange?.([]);
      return;
    }

    try {
      const searchResults = await searchService.searchPlaces(searchQuery);
      setResults(searchResults);
      onResultsChange?.(searchResults);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
      onResultsChange?.([]);
    }
  }, [onResultsChange]);

  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      handleSearch(newValue);
    }, DEBOUNCE_DELAY);
  }, [handleSearch]);

  const handleResultClick = useCallback((result) => {
    setResults([]);
    onResultsChange?.([]);
    setLocalValue(result.display_name); // Add this line to update the input value
    onLocationSelect?.(result);
  }, [onLocationSelect, onResultsChange]);

  const handleCurrentLocation = useCallback(() => {
    if (userPosition?.display_name) {
      setLocalValue(userPosition.display_name);
      onLocationSelect?.(userPosition);
    }
  }, [userPosition, onLocationSelect]);

  return (
    <div ref={containerRef} className={className}>
      <TextField
        type="search"
        autoComplete="off"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CiSearch className="text-xl" />
            </InputAdornment>
          ),
          ...(currentLocation && {
            endAdornment: (
              <InputAdornment 
                position="end" 
                className="cursor-pointer" 
                onClick={handleCurrentLocation}
              >
                <MdLocationOn className="text-xl" />
              </InputAdornment>
            ),
          }),
          ...inputProps,
        }}
        value={localValue}
        className="!shadow-md"
        sx={{ borderRadius: "8px", backgroundColor: "white" }}
        fullWidth
        onChange={handleChange}
        onFocus={onFocus}
        placeholder="Search for a place"
        size={size}
      />
      {showList && results.length > 0 && (
        <List
          sx={{ width: "100%", bgcolor: "white", marginTop: "8px" }}
          className="rounded-lg"
        >
          {results.map((result, index) => (
            <ListItemButton
              key={result.place_id || index}
              onClick={() => handleResultClick(result)}
            >
              <ListItemText
                primary={
                  <TruncateMarkup lines={2}>
                    <span className="!text-md">
                      {result.display_name}
                      {result.type && (
                        <span className="ml-2 text-sm text-gray-500">
                          ({result.type})
                        </span>
                      )}
                    </span>
                  </TruncateMarkup>
                }
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </div>
  );
};

export default GeoSearch;