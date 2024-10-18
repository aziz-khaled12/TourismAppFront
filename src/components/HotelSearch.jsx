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
import Header from "./Header";

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

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="w-full min-h-[90vh] flex items-center flex-col m-auto justify-between ">
      <div className="w-full">
    

        <Header title={"Hotel Search"} map={true} handleBack={handleBack} />

        <div className="w-full p-5">
          <div className="w-full flex items-center justify-start">
            <HotelSearchBox />
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
      </div>
      <div className="w-full p-4 flex items-center justify-center ">
        <Button
          sx={{
            backgroundColor: "#15803d",
            borderRadius: "8px",
            paddingY: "12px",
            fontSize: "16px",
            fontWeight: "500",
            textTransform: "none",
            paddingX: "16px",
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

export default HotelSearch;
