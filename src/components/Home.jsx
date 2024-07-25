import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import discoverImage from "../assets/discover2.jpg";
import { MdOutlineRestaurant } from "react-icons/md";
import { FaHotel } from "react-icons/fa6";
import { MdCarRental } from "react-icons/md";
import { FaTaxi } from "react-icons/fa6";
import { MdAttractions } from "react-icons/md";
import { IconButton, Typography } from "@mui/material";
import { GetRoles } from "../datafetch/users";
import LocationCard from "./LocationCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

const Home = () => {
  const services = [
    {
      id: 0,
      icon: <FaHotel className="text-2xl" />,
      name: "Hotels",
      link: "/hotel",
    },
    {
      id: 1,
      icon: <FaTaxi className="text-2xl" />,
      name: "Taxi",
    },
    {
      id: 2,
      icon: <MdOutlineRestaurant className="text-2xl" />,
      name: "Restaurants",
    },
    {
      id: 3,
      icon: <MdCarRental className="text-2xl" />,
      name: "Car rental",
    },
    {
      id: 4,
      icon: <MdAttractions className="text-2xl" />,
      name: "Places",
    },
  ];
  const [loading, setLoading] = useState(true);
  const { accessToken, user, verifyToken, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      verifyToken();
    }
  }, [accessToken, isAuthenticated]);

  useEffect(() => {
    if (accessToken && user) {
      setLoading(false);
    }
  });

  const images = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
    "https://example.com/image4.jpg",
  ];

  return loading ? (
    <>
      <div className="w-full min-h-screen flex items-center justify-center flex-col m-auto">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <style>{`.spinner_z9k8{transform-origin:center;animation:spinner_StKS .75s infinite linear}@keyframes spinner_StKS{100%{transform:rotate(360deg)}}`}</style>
          <path
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25"
          />
          <path
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
            className="spinner_z9k8"
          />
        </svg>
      </div>
    </>
  ) : (
    <>
      <div className="w-full">
        <div className="relative h-[50vh] w-full">
          <img src={discoverImage} alt="discover" className="w-full h-full" />
          <div className="text-2xl absolute left-2 z-10 font-[600] top-10">
            Discover
          </div>
        </div>
        <section className="w-full p-2 h-fit">
          <div className="w-full flex gap-2 items-center justify-center">
            {services.map((service) => {
              return (
                <Link
                  key={service.id}
                  className="flex flex-col items-center justify-center"
                  to={service.link}
                >
                  <IconButton className="!rounded-full !bg-secondary !p-4 !text-black !w-[56px] !h-[56px] !mb-1">
                    {service.icon}
                  </IconButton>
                  <div className="text-xs text-center font-[500]">
                    {service.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
        <section className="w-full flex justify-center p-2">
          <div className="w-[90%] flex  flex-col justify-center">
            <Typography variant="h5" className="!mb-4">
              Locations
            </Typography>
            <div className="flex w-full">
              <Swiper
                spaceBetween={50}
                slidesPerView={2}
               
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <LocationCard></LocationCard>
                  </SwiperSlide>
                ))}
                <SwiperSlide></SwiperSlide>
              </Swiper>
              
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
