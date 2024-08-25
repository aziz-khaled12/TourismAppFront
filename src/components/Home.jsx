import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import discoverImage from "../assets/discover1.jpg";
import {

  IconButton,

} from "@mui/material";
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
} from "react-icons/ri";
import attractionImage from "../assets/attraction.jpg";
import carRentalImage2 from "../assets/carRental2.jpg";
import hotelRoomImage from "../assets/hotelRoom.jpg";
import restaurantImage2 from "../assets/resto2.jpg";
import taxiImage2 from "../assets/taxi2.jpg";
import backgroundThing from "../assets/backgroundThing.png"
import { OneEightyRingWithBg } from "react-svg-spinners";
import { Pagination } from "swiper/modules";
import mountainImage from "../assets/landingMountain.jpg"
import "swiper/css/pagination";
import Navbar from "./Navbar";


const Home = () => {
  const navigate = useNavigate();
  const images = [1, 2, 4, 5, 6, 7, 8, 9, 0, 0];
  const services = [
    {
      id: 0,
      icon: <RiHotelLine className="text-2xl" />,
      name: "Hotel Booking",
      desc: "Search for your ideal destination, choose the perfect hotel, and book your stay—all in one seamless experience.",
      link: "/hotels",
      image: hotelRoomImage,
    },
    {
      id: 1,
      icon: <RiTaxiLine className="text-2xl" />,
      name: "Taxi",
      desc: "Quickly book a taxi by entering your start and end locations, and get connected to a nearby taxi for a smooth ride to your destination.",
      link: "/login",
      image: taxiImage2,
    },
    {
      id: 2,
      icon: <RiRestaurant2Line className="text-2xl" />,
      name: "Restaurants",
      desc: "Search for top restaurants in your area, pick your favorite, and reserve your table—all in one simple step.",
      link: "/restaurants",
      image: restaurantImage2,
    },
    {
      id: 3,
      icon: <RiCarLine className="text-2xl" />,
      name: "Car rental",
      desc: "Search for the best car rentals, select the perfect ride, and book it effortlessly—all in one convenient place.",
      image: carRentalImage2,
    },
    {
      id: 4,
      icon: <RiBuildingLine className="text-2xl" />,
      name: "Places",
      desc: "Find and explore local attractions easily with our interactive map and search feature, helping you discover popular spots and points of interest.",
      image: attractionImage,
    },
  ];
  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(true);
  const { accessToken, user } = useAuth();


  const handleHover = (name) => {
    setSelected(name);
  };

  const handleLeave = () => {
    setSelected("");
  };

  const handleRedirect = (link) => {
    navigate(link);
  };


  useEffect(() => {
    if (accessToken && user) {
      setLoading(false);
    }
  });

  return loading ? (
    <>
      <div className="w-full min-h-screen flex items-center justify-center flex-col m-auto">
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
       <Navbar />

        <div className="relative mb-7 sm:hidden h-[50vh] w-full overflow-hidden ">
          <img src={discoverImage} alt="discover" className="w-full h-full" />
          <div className="text-3xl absolute left-6 z-10 font-[600] top-20 text-white">
            Discover
          </div>
        </div>

      
        <div className="hidden relarive w-full sm:flex items-center justify-evenly h-[95vh]">
          <div className="md:w-full lg:w-[45%] text-center lg:text-start">
            <h1 className="!leading-snug md:text-6xl sm:text-5xl text-primary font-bold mb-8 ">
              Discover <span className="text-green-700"> Algeria </span>  Like Never Before.
            </h1>
            <p className="text-base sm:text-base md:text-lg text-primary opacity-90 font-medium">
              Unveil the hidden gems of Algeria, from the vast Sahara Desert to
              the stunning Mediterranean coastline. Our app guides you through
              breathtaking landscapes, ancient ruins, and vibrant cities.
            </p>
          </div>
          <div className="w-[40%] hidden lg:block rounded-2xl ">
            <img src={mountainImage} alt="mountain" className="w-full h-auto max-h-[80vh] rounded-2xl"/>
          </div>
        </div>

        <section className="w-full h-fit relative z-50">
          <div className="w-full my-10 sm:block hidden">
          <div className="text-start">
              <p className="font-medium sm:text-base tracking-widest text-green-700 mb-2">SERVICES</p>
              <h1 className="font-semibold sm:mb-5 sm:text-3xl lg:text-4xl text-primary mb-8">Everything you need in one place</h1>
            </div>
            <div className="hidden sm:flex w-full items-center justify-between p-4">
              <Swiper
                spaceBetween={30}
                slidesPerView={2}
                pagination={{
                  dynamicBullets: true,
                }}
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
              >
                {services.map((service, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={`flex-1 max-h-[700px] relative hover:cursor-pointer`}
                      onMouseEnter={() => {
                        handleHover(service.name);
                      }}
                      onMouseLeave={handleLeave}
                      onClick={() => {
                        handleRedirect(service.link);
                      }}
                      key={index}
                    >
                      <img
                        src={service.image}
                        alt={service.name}
                        className={`w-full h-auto max-h-[700px] rounded-lg relative`}
                      />

                      <div
                        className={`z-10 duration-200 absolute rounded-lg top-0 w-full h-full ${
                          selected == service.name ? "opacity-70 " : "opacity-0"
                        } bg-black`}
                      ></div>

                      <div
                        className={`absolute rounded-lg top-0 z-20 duration-200 ${
                          selected == service.name
                            ? "opacity-100 "
                            : "opacity-0"
                        }  text-white text-2xl bg-transparent flex items-center justify-center font-bold w-full h-full`}
                      >
                        <div className="text-center p-8">
                          <h1 className="text-white text-2xl font-semibold mb-4">
                            {service.name}
                          </h1>
                          <p className="text-sm font-medium">{service.desc}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="w-full flex gap-2 items-start justify-around sm:hidden">
            {services.map((service) => {
              return (
                <Link
                  key={service.id}
                  className="flex flex-col items-center justify-center"
                  to={service.link}
                >
                  <IconButton
                    focusRipple
                    className="!rounded-full !bg-secondary !p-4 !text-black !w-[56px] !h-[56px] !mb-1"
                  >
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
        <section className="w-full flex justify-center p-2 my-10">
          <div className="w-full flex  flex-col justify-center">
            <div className="text-start hidden sm:block">
              <p className="font-medium text-base tracking-widest text-green-700 mb-2">LOCATIONS</p>
              <h1 className="font-semibold hidden sm:block sm:mb-5 sm:text-3xl lg:text-4xl text-primary mb-8">Explore Nearby Locations</h1>
            </div>
            <div className="sm:hidden block text-start text-xl mb-5 font-medium text-primary">
                Trending Location
            </div>
            <div className="flex w-full">
              <Swiper
                pagination={{
                  dynamicBullets: true,
                }}
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
                slidesPerView={1.5}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <LocationCard></LocationCard>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
