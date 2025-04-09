import React from "react";
import axios from "axios";
import {
  RiHotelBedFill,
  RiHotelBedLine,
  RiRestaurantFill,
  RiRestaurantLine,
  RiTaxiFill,
  RiTaxiLine,
} from "react-icons/ri";
import { MdAttractions, MdOutlineAttractions } from "react-icons/md";


// Constants
export const DEBOUNCE_DELAY = 500;

export const FILTERS = {
  HOTELS: "Hotels",
  RESTAURANTS: "Restaurants",
  CAR_AGENCIES: "Car Agencies",
  PLACES: "Places",
};

export const filters = [
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
// export const textFieldStyles = {
//   backgroundColor: "white",
//   borderRadius: "99px",
//   width: "100%",
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: "#dfdfdf",
//       borderRadius: "99px",
//     },
//     "&:hover fieldset": {
//       borderColor: "#dfdfdf",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#dfdfdf",
//     },
//     "& .MuiInputBase-input": {
//       padding: "16px 16px 16px 0px",
//     },
//     border: "1px solid #dfdfdf",
//   },
// };

// Separate API service
 export const searchService = {
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

      return results.flat().slice(0, 5); // Limit to 5 total results
    } catch (error) {
      console.error("Search error:", error);
      return [];
    }
  },
};