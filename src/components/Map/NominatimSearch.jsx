import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  Chip,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import axios from "axios";
import TruncateMarkup from "react-truncate-markup";
import { useMap } from "react-leaflet";
import { CiSearch } from "react-icons/ci";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  RiHotelBedFill,
  RiHotelBedLine,
  RiRestaurantFill,
  RiRestaurantLine,
  RiTaxiFill,
  RiTaxiLine,
} from "react-icons/ri";
import {MdAttractions, MdOutlineAttractions} from 'react-icons/md';

// Constants
const DEBOUNCE_DELAY = 500;

const FILTERS = {
  HOTELS: "Hotels",
  RESTAURANTS: "Restaurants",
  CAR_AGENCIES: "Car Agencies",
  PLACES: "Places",
};

const filters = [
  {
    name: FILTERS.HOTELS,
    icon: <RiHotelBedLine className="text-xl text-primary" />,
    selectedIcon: <RiHotelBedFill className="text-xl !text-background" />,
    amenity: "hotel",
  },
  {
    name: FILTERS.RESTAURANTS,
    icon: <RiRestaurantLine className="text-xl text-primary" />,
    selectedIcon: <RiRestaurantFill className="text-xl !text-background" />,
    amenity: "restaurant",
  },
  {
    name: FILTERS.CAR_AGENCIES,
    icon: <RiTaxiLine className="text-xl text-primary" />,
    selectedIcon: <RiTaxiFill className="text-xl !text-background" />,
    amenity: "car_rental",
  },
  {
    name: FILTERS.PLACES,
    icon: <MdOutlineAttractions className="text-xl text-primary" />,
    selectedIcon: <MdAttractions className="text-xl !text-background" />,
    amenity: "attractions",
  },
];

// Memoized styles
const textFieldStyles = {
  backgroundColor: "white",
  borderRadius: "99px",
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#dfdfdf",
      borderRadius: "99px",
    },
    "&:hover fieldset": {
      borderColor: "#dfdfdf",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#dfdfdf",
    },
    "& .MuiInputBase-input": {
      padding: "16px 16px 16px 0px",
    },
    border: "1px solid #dfdfdf",
  },
};



const NominatimSearch = ({ selectedFilters, setSelectedFilters }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const map = useMap();
  const debounceTimeoutRef = useRef(null);
  const markersRef = useRef([]);
  const containerRef = useRef(null);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
  }, []);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await searchService.searchPlaces(query, selectedFilters);
      setResults(searchResults);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [query, selectedFilters]);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(handleSearch, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(debounceTimeoutRef.current);
    };
  }, [handleSearch]);

  const handleResultClick = useCallback((lat, lon) => {
    setResults([]);
    clearMarkers();
    const marker = L.marker([lat, lon]);
    marker.addTo(map);
    markersRef.current.push(marker);
    map.flyTo([lat, lon], 17);
  }, [map, clearMarkers]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback((filter) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  }, [setSelectedFilters]);

  const renderChip = useCallback((filter, index) => (
    <SwiperSlide key={index} style={{ width: "fit-content" }}>
      <Chip
        icon={selectedFilters.includes(filter.name) ? filter.selectedIcon : filter.icon}
        label={filter.name}
        sx={{
          border: "1px solid #dfdfdf",
          fontSize: "14px",
          padding: "4px 8px",
        }}
        onClick={() => handleSelect(filter.name)}
        className={`${
          selectedFilters.includes(filter.name)
            ? "!bg-green-700 !text-background transition-colors duration-100"
            : "!text-primary !bg-white transition-colors duration-100"
        } !shadow-md`}
      />
    </SwiperSlide>
  ), [selectedFilters, handleSelect]);

  return (
    <div className="z-500 top-0 px-4 py-6 w-full absolute flex items-center justify-center gap-4 flex-col">
      <div ref={containerRef} className="w-full">
        <TextField
          id="outlined-search"
          type="search"
          size="small"
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CiSearch className={`text-2xl ${isLoading ? "animate-spin" : ""}`} />
              </InputAdornment>
            ),
          }}
          value={query}
          className="!shadow-md"
          sx={textFieldStyles}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a place"
        />
        {results.length > 0 && (
          <List
            sx={{ width: "100%", bgcolor: "white", marginTop: "8px" }}
            className="rounded-lg"
          >
            {results.map((result, index) => (
              <ListItemButton
                key={index}
                onClick={() => handleResultClick(result.lat, result.lon)}
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
      <div className={`w-full ${results.length > 0 ? "hidden" : "block"}`}>
        <Swiper spaceBetween={4} slidesPerView="auto">
          {filters.map((filter, index) => renderChip(filter, index))}
        </Swiper>
      </div>
    </div>
  );
};

export default React.memo(NominatimSearch);