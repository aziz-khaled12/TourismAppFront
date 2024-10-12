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
import RestaurantSearchBox from "./RestaurantSearchBox";
import { RiRestaurantFill } from "react-icons/ri";
import { CiMap } from "react-icons/ci";
import { SlArrowLeft } from "react-icons/sl";

const popularLocations = [
  { name: "Tipaza" },
  { name: "Alger" },
  { name: "Constantine" },
  { name: "Oran" },
  { name: "Annaba" },
];
const RestaurantSearch = () => {
  const navigate = useNavigate();

  const handleSelect = (wilaya) => {
    navigate(`/restaurants/${wilaya}`);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="w-full min-h-[90vh] flex items-center flex-col m-auto justify-between ">
      <div className="w-full">
        <div className="w-full mt-10 border-[#6e6e6e] border-b border-solid">
          <div className="w-full flex justify-between p-4 mb-3">
            <div className="flex items-center font-[600] text-xl ">
              <SlArrowLeft
                className="mr-3 cursor-pointer"
                onClick={handleBack}
              />
              Restaurants Search
            </div>
            <div className="flex items-center text-3xl ">
              <CiMap
                className="cursor-pointer"
                onClick={() => {
                  navigate("/map");
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-full p-5">
          <div className="w-full flex items-center relative justify-start">
            <RestaurantSearchBox />
          </div>

          <div className="w-full mt-8">
            <div className="text-base mb-5 font-medium">
              Popular destinations
            </div>
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
                        <span className="!text-lg !font-medium">
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
      </div>

      <div className="w-full p-4 flex items-center justify-center">
      <Button
          sx={{
            backgroundColor: "#15803d",
            borderRadius: "8px",
            paddingY: "12px",
            fontSize: "16px",
            fontWeight: "500",
            textTransform: "none",
            paddingX: "16px"
          }}
          variant="contained"
          startIcon={<MdNearMe />}
        >
          Near me
        </Button>
      </div>
    </div>
  );
};

export default RestaurantSearch;
