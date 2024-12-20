import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import discoverImage from "../assets/discover1.jpg";
import { Divider, IconButton } from "@mui/material";
import LocationCard from "./LocationCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link, useNavigate } from "react-router-dom";
import {
  RiBuildingLine,
  RiCarLine,
  RiHotelLine,
  RiTaxiLine,
  RiRestaurant2Line,
  RiHome5Line,
  RiHome5Fill,
  RiHotelFill,
  RiRestaurantLine,
  RiRestaurantFill,
  RiCarFill,
} from "react-icons/ri";
import attractionImage from "../assets/attraction.jpg";
import carRentalImage2 from "../assets/carRental2.jpg";
import hotelRoomImage from "../assets/hotelRoom.jpg";
import restaurantImage2 from "../assets/resto2.jpg";
import taxiImage2 from "../assets/taxi2.jpg";
import backgroundThing from "../assets/backgroundThing.png";
import { OneEightyRingWithBg } from "react-svg-spinners";
import { Pagination } from "swiper/modules";
import homeImage from "../assets/attractionAlgeria.jpg";
import "swiper/css/pagination";
import Navbar from "./Navbar";
import { GetWilayaBestPlaces } from "../datafetch/locations";
import { useSelector } from "react-redux";
import ServicesSwiper from "./ServicesSwiper";
import { GetWilayaBestHotels } from "../datafetch/hotels";
import { GetWilayaBestRestaurants } from "../datafetch/restaurants";
const Home = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(true);
  const { accessToken, user } = useAuth();
  const wilaya = useSelector((state) => state.selectedTab.wilaya);

  const services = [
    {
      id: 0,
      icon: <RiHome5Line className="text-2xl" />,
      selectedIcon: <RiHome5Fill className="text-2xl" />,
      name: "Home",
      link: "/",
    },
    {
      id: 1,
      icon: <RiHotelLine className="text-2xl" />,
      selectedIcon: <RiHotelFill className="text-2xl" />,
      name: "Hotels",
      link: `/hotels/${wilaya}`,
    },
    {
      id: 2,
      icon: <RiRestaurantLine className="text-2xl" />,
      selectedIcon: <RiRestaurantFill className="text-2xl" />,
      name: "Resto",
      link: `/restaurants/${wilaya}`,
    },
    {
      id: 3,
      icon: <RiCarLine className="text-2xl" />,
      selectedIcon: <RiCarFill className="text-2xl" />,
      name: "Cars",
      link: "/cars", // Add link for the Cars page if needed
    },
    {
      id: 4,
      icon: <RiBuildingLine className="text-2xl" />,
      selectedIcon: <RiBuildingLine className="text-2xl" />,
      name: "Places",
      link: "/places",
      desc: "Find and explore local attractions easily with our interactive map and search feature, helping you discover popular spots and points of interest.",
    },
  ];

  useEffect(() => {
    const fetchBestPlaces = () => {
      GetWilayaBestPlaces(setPlaces, wilaya, accessToken, 5);
      GetWilayaBestHotels(setHotels, wilaya, accessToken, 5);
      GetWilayaBestRestaurants(setRestaurants, wilaya, accessToken, 5);
    };
    fetchBestPlaces();
  }, [wilaya]);


 

  useEffect(() => {
    if (accessToken && user && places.length > 0 && hotels.length > 0 && restaurants.length > 0) {
      setLoading(false);
    }
  });

  return loading ? (
    <>
      <div className="w-full h-[80vh] flex items-center justify-center flex-col m-auto">
        <OneEightyRingWithBg className="!text-primary" />
      </div>
    </>
  ) : (
    <>
      

      <div className="w-full sm:px-10 md:px-15 lg:px-20 sm:pt-11 sm:pb-16">
        <div className="hidden sm:block absolute -top-[100px] -right-[450px]">
          <img src={backgroundThing} alt="thing" className="w-full h-full" />
        </div>
        <div className="hidden sm:block absolute bottom-[50%] rotate-90 -left-[460px]">
          <img src={backgroundThing} alt="thing" className="w-full h-full" />
        </div>



        {/* <div className="relative mb-7 sm:hidden h-[40vh] w-full overflow-hidden ">
          <img src={discoverImage} alt="discover" className="w-full h-full" />
          <div className="text-3xl absolute left-6 z-10 font-[600] top-20 text-white">
            Discover
          </div>
        </div> */}

        <div className="h-screen w-full sm:flex sm:justify-center sm:items-center hidden ">
          <div className="w-[70%]  text-center relative z-20">
            <h1 className="!leading-snug md:text-6xl sm:text-5xl text-black font-bold mb-8 ">
              Discover <span className="text-green-700"> Algeria </span> Like
              Never Before.
            </h1>
            <p className="text-base sm:text-base md:text-lg text-black opacity-90 font-medium">
              Unveil the hidden gems of Algeria, from the vast Sahara Desert to
              the stunning Mediterranean coastline. Our app guides you through
              breathtaking landscapes, ancient ruins, and vibrant cities.
            </p>
          </div>

          {/* <div className="w-full hidden lg:block absolute top-0 left-0">
            <img
              src={homeImage}
              alt="mountain"
              className="w-full h-auto max-h-screen"
            />
          </div>

          <div className="w-full h-screen bg-black opacity-40 absolute top-0 left-0"></div> */}
        </div>

        <section className="w-full my-4 flex justify-center p-2 sm:my-10">
          <div className="w-full flex  flex-col justify-center">
            <div className="text-start hidden sm:block">
              <p className="font-medium text-base tracking-widest text-green-700 mb-2">
                LOCATIONS
              </p>
              <h1 className="font-semibold hidden sm:block sm:mb-5 sm:text-3xl lg:text-4xl text-primary mb-8">
                Explore Nearby Locations
              </h1>
            </div>
            <div className="flex sm:hidden items-center justify-between mb-5 ">
              <div className="text-start text-2xl font-semibold text-primary">
                Trending Location
              </div>
              <div
                className="font-normal text-xs text-lightText underline"
                onClick={() => {
                  navigate(`/places`);
                }}
              >
                See More
              </div>
            </div>
            <div className="flex w-full max-h-[350px] sm:h-auto sm:max-h-max">
              <Swiper
                modules={[Pagination]}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                  1200: {
                    slidesPerView: 3,
                  },
                }}
                spaceBetween={20}
                slidesPerView={1.2}
              >
                {places.length > 0 &&
                  places.map((place, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <LocationCard data={place} />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
        </section>
        <section className="w-full flex my-4 justify-center p-2 sm:my-10">
          <div className="w-full flex  flex-col justify-center">
            <div className="text-start hidden sm:block">
              <p className="font-medium text-base tracking-widest text-green-700 mb-2">
                RESTAURANTS
              </p>
              <h1 className="font-semibold hidden sm:block sm:mb-5 sm:text-3xl lg:text-4xl text-primary mb-8">
                Explore Where to Eat Next
              </h1>
            </div>
            <div className="flex sm:hidden items-center justify-between mb-5 ">
              <div className="text-start text-2xl font-semibold text-primary">
                Trending Restaurants
              </div>
              <div
                className="font-normal text-xs text-lightText underline"
                onClick={() => {
                  navigate(`/places`);
                }}
              >
                See More
              </div>
            </div>
            <div className="flex w-full max-h-[350px] sm:h-auto sm:max-h-max">
              <Swiper
                modules={[Pagination]}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                  1200: {
                    slidesPerView: 3,
                  },
                }}
                spaceBetween={20}
                slidesPerView={1.2}
              >
                {restaurants.length > 0 &&
                  restaurants.map((place, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <LocationCard data={place} />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
        </section>


        <section className="w-full flex justify-center my-4 p-2 sm:my-10">
          <div className="w-full flex  flex-col justify-center">
            <div className="text-start hidden sm:block">
              <p className="font-medium text-base tracking-widest text-green-700 mb-2">
                HOTELS
              </p>
              <h1 className="font-semibold hidden sm:block sm:mb-5 sm:text-3xl lg:text-4xl text-primary mb-8">
                Best Hotels in the Area
              </h1>
            </div>
            <div className="flex sm:hidden items-center justify-between mb-5 ">
              <div className="text-start text-2xl font-semibold text-primary">
                Trending Hotels
              </div>
              <div
                className="font-normal text-xs text-lightText underline"
                onClick={() => {
                  navigate(`/hotels/${wilaya}`);
                }}
              >
                See More
              </div>
            </div>
            <div className="flex w-full max-h-[350px] sm:h-auto sm:max-h-max">
              <Swiper
                modules={[Pagination]}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                  1200: {
                    slidesPerView: 3,
                  },
                }}
                spaceBetween={20}
                slidesPerView={1.2}
              >
                {hotels.length > 0 &&
                  hotels.map((place, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <LocationCard data={place} />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
        </section>







      </div>
    </>
  );
};

export default Home;
