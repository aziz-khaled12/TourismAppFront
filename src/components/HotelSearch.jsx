import React from "react";
import HotelSearchBox from "./HotelSearchBox";
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

const popularLocations = [
  { name: "Tipaza" },
  { name: "Alger" },
  { name: "Constantine" },
  { name: "Oran" },
  { name: "Annaba" },
];
const HotelSearch = () => {
  const navigate = useNavigate();
 

  const handleSelect = (wilaya) => {
    navigate(`/hotels/${wilaya}`);
  };

  return (
    <div className="w-full min-h-screen flex items-center flex-col m-auto justify-between p-5">
      <div className="w-full">
        <div className="w-full flex items-center mt-8  justify-start">
          <HotelSearchBox/>
        </div>

        <div className="w-full mt-8">
          <div className="text-base mb-5 font-medium">Popular destinations</div>
          <List
            sx={{ width: "100%" }}
            className="!mt-2 rounded-lg !w-full !bg-[#eaeaea]"
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
                      <span className="text-lg font-medium">
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
      <div className="w-full p-4 flex items-center justify-center ">
        <Button
          sx={{backgroundColor: "#15803d", borderRadius: "99px", padding: "16px", fontSize: "18px", fontWeight: "500", textTransform: "none"}}
          variant="contained"
          startIcon={<MdNearMe className="text-lg" />}
        >
          Near me
        </Button>
      </div>

   
    </div>
  );
};

export default HotelSearch;
