import React, { useEffect, useState } from "react";
import GeocoderComponent from "./GeocoderControl";
import { GetHotels } from "../datafetch/locations";
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

const popularLocations = [
  { name: "Tipaza" },
  { name: "Alger" },
  { name: "Constantine" },
  { name: "Oran" },
  { name: "Annaba" },
];
const HotelSearch = () => {
  const [hotels, setHotels] = useState();
  const navigate = useNavigate()
  const { accessToken } = useAuth();
  useEffect(() => {
    const fetchHotels = async () => {
      await GetHotels(setHotels, accessToken);
    };
    fetchHotels();
  }, []);


  const handleSelect = (wilaya) => {
    navigate(`/hotel/${wilaya}`)
  }


  return (
    <div className="w-full min-h-screen flex items-center flex-col m-auto">
      <div className="w-[95%] m-auto">
        <div className="w-full flex items-center mt-4 p-2">
          <GeocoderComponent data={hotels} type="place" />
        </div>

        <div className="p-4 w-full">
          <div className="text-md my-4 font-[500]">Popular destinations</div>
          <List
            sx={{ width: "100%" }}
            className="!mt-2 rounded-lg !w-full !bg-secondary"
          >
            {popularLocations.map((location, index) => {
              return (
                <ListItemButton
                  key={index}
                  className={`!h-[60px] !border-white !border-solid ${
                    index !== popularLocations.length - 1 ? "!border-b-2" : ""
                  }`}
                  onClick={() => {handleSelect(location.name)}}
                >
                  <ListItemIcon>
                    <HiOutlineLocationMarker className="text-2xl" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <span className="!text-md !font-[500]">
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
          className="!bg-green-800 !p-4 !rounded-full"
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
