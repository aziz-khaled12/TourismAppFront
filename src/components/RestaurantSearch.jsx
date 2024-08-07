import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdNearMe } from "react-icons/md";
import {
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GetRestaurants } from "../datafetch/restaurants";
import RestaurantSearchBox from "./RestaurantSearchBox";

const popularLocations = [
  { name: "Tipaza" },
  { name: "Alger" },
  { name: "Constantine" },
  { name: "Oran" },
  { name: "Annaba" },
];
const RestaurantSearch = () => {
  const [restaurants, setRestaurants] = useState();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  useEffect(() => {
    const fetchRestaurants = async () => {
      await GetRestaurants(setRestaurants, accessToken);
    };
    fetchRestaurants();
  }, []);

  const handleSelect = (wilaya) => {
    navigate(`/restaurants/${wilaya}`);
  };

  return (
    <div className="w-full min-h-screen flex items-center flex-col m-auto justify-between p-5">
      <div className="w-[95%] mx-auto ">
        <div className="w-full flex items-center mt-4 p-2 justify-start">
          <RestaurantSearchBox />
        </div>

        <div className="w-full">
          <div className="text-xl my-4 font-[600]">Popular destinations</div>
          <List
            sx={{ width: "100%" }}
            className="!mt-2 rounded-lg !w-full !bg-lightBackground"
          >
            {popularLocations.map((location, index) => {
              return (
                <ListItemButton
                  key={index}
                  className={`!border-white !border-solid p-4 ${
                    index !== popularLocations.length - 1 ? "!border-b-2" : ""
                  }`}
                  onClick={() => {
                    handleSelect(location.name);
                  }}
                >
                  <ListItemIcon className="!text-black !opacity-60">
                    <HiOutlineLocationMarker className="text-3xl" />
                  </ListItemIcon>
                  <ListItemText
                    className="!py-2 "
                    primary={
                      <span className="!text-lg !font-[600]">
                        {location.name}
                      </span>
                    }
                  />
                </ListItemButton>
              );
            })}
          </List>
        </div>
      </div>
      <div className="w-full p-4 flex items-center justify-center">
        <Button
          className="!bg-green-700 !p-5 !rounded-full !text-xl"
          variant="contained"
          startIcon={<MdNearMe className="!text-2xl" />}
        >
          Near me
        </Button>
      </div>

   
    </div>
  );
};

export default RestaurantSearch;
