import React, { useEffect, useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { CiMap } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { GetWilayaHotels } from "../datafetch/hotels";
import { useAuth } from "../context/AuthContext";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import HotelResultCard from "./HotelResultCard";
import { Skeleton, styled, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { VscSettings } from "react-icons/vsc";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { GetWilayaRestaurants } from "../datafetch/restaurants";
import RestaurantCard from "./RestaurantCard";

const RestaurantResults = () => {
  const { accessToken } = useAuth();
  const { wilaya } = useParams();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    GetWilayaRestaurants(setRestaurants, wilaya, accessToken);
  }, [accessToken, wilaya]);

  const handleBack = () => {
    navigate("/restaurants");
  };


  return (
    <div className="w-full flex flex-col justify-start items-center min-h-screen overflow-hidden">
      <div className="w-full mt-10 border-[#6e6e6e] border-b border-solid">
        <div className="w-full flex justify-between p-4 mb-3">
          <div className="flex items-center font-[600] text-xl ">
            <SlArrowLeft className="mr-3 cursor-pointer" onClick={handleBack} />
            Restaurants in {wilaya}
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

      {restaurants.length > 0 ? (
        <div className="p-2 mt-4">
          {restaurants.map((resto, index) => (
            <RestaurantCard
              key={index}
              resto={resto}
              link={"/"}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center">
          <p className="font-bold text-3xl text-center p-4 mb-8">
            we could not find any restaurants in {wilaya}
          </p>
          <p className="text-xl font-[400]">try searching for something else</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantResults;
