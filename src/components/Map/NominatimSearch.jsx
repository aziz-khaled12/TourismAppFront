import React, { useEffect, useRef, useState } from "react";
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

// Separate the filters configuration
const FILTERS = {
  HOTELS: "Hotels",
  RESTAURANTS: "Restaurants",
  CAR_AGENCIES: "Car Agencies",
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
];

// Separate API service
const searchService = {
  async searchPlaces(query, filters = []) {
    if (!query.trim()) return [];

    try {
      const baseParams = {
        countrycodes: "dz",
        format: "json",
        addressdetails: 1,
        limit: 5,
      };

      if (filters.length === 0) {
        // General search if no filters selected
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: query,
              ...baseParams,
            },
          }
        );
        return response.data;
      }

      // Search with filters
      const amenities = filters
        .map(
          (filterName) => filters.find((f) => f.name === filterName)?.amenity
        )
        .filter(Boolean);

      // You'll need to implement these specific search functions
      const results = await Promise.all([
        ...amenities.map((amenity) => searchByAmenity(query, amenity)),
      ]);

      return results.flat().slice(0, 5); // Limit to 5 total results
    } catch (error) {
      console.error("Search error:", error);
      return [];
    }
  },
};

// Template functions for specific searches - implement these based on your needs
async function searchByAmenity(query, amenity) {
  // Example implementation using Overpass API
  const overpassQuery = `
    [out:json][timeout:25];
    area["name"="Algeria"]->.searchArea;
    (
      nwr["amenity"="${amenity}"](area.searchArea);
    );
    out body;
    >;
    out skel qt;
  `;

  try {
    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      overpassQuery
    );
    return response.data.elements.map((element) => ({
      // Transform the response to match your needed format
      display_name: element.tags.name || "Unnamed location",
      lat: element.lat,
      lon: element.lon,
      type: amenity,
      // Add other properties as needed
    }));
  } catch (error) {
    console.error(`Error searching for ${amenity}:`, error);
    return [];
  }
}

const NominatimSearch = ({ selectedFilters, setSelectedFilters }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const map = useMap();
  const debounceTimeoutRef = useRef(null);
  const markersRef = useRef([]);

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
  };

  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await searchService.searchPlaces(
          query,
          selectedFilters
        );
        setResults(searchResults);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(handleSearch, 500);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [query, selectedFilters]);

  const handleResultClick = (lat, lon) => {
    setResults([]);
    clearMarkers();
    const marker = L.marker([lat, lon]);
    marker.addTo(map);
    markersRef.current.push(marker);
    map.flyTo([lat, lon], 17);
  };

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  useEffect(() => {
    console.log(selectedFilters);
  }, [selectedFilters]);

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
                <CiSearch
                  className={`text-2xl ${isLoading ? "animate-spin" : ""}`}
                />
              </InputAdornment>
            ),
          }}
          value={query}
          className="!shadow-md"
          sx={{
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
          }}
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
      <div className="w-full">
        <Swiper spaceBetween={4} slidesPerView="auto">
          {filters.map((filter, index) => (
            <SwiperSlide key={index} style={{ width: "fit-content" }}>
              <Chip
                icon={
                  selectedFilters.includes(filter.name)
                    ? filter.selectedIcon
                    : filter.icon
                }
                label={filter.name}
                sx={{
                  border: "1px solid #dfdfdf",
                  fontSize: "14px",
                  padding: "4px 8px",
                }}
                onClick={() => handleSelect(filter.name)}
                className={`${
                  selectedFilters.includes(filter.name)
                    ? `!bg-green-700 !text-background transition-colors duration-100`
                    : "!text-primary !bg-background transition-colors duration-100"
                } !shadow-md`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NominatimSearch;
