import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import discoverImage from "../assets/discover1.jpg";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
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
import homeImage from "../assets/homeImage.jpg";
import homeImage2 from "../assets/homeImage2.jpg";
import homeImage3 from "../assets/homeImage3.jpg";
import { OneEightyRingWithBg } from "react-svg-spinners";
import homePageTree from "../assets/homepageTree.jpg";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { logout } = useAuth();

  const handleHover = (name) => {
    setSelected(name);
  };

  const handleLeave = () => {
    setSelected("");
  };

  const handleRedirect = (link) => {
    navigate(link);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      <div className="w-full">
        <nav className="w-full absolute top-0 px-4 py-2 shadow-xl sm:block hidden z-10">
          <div className="w-[90%] flex justify-between items-center m-auto">
            <div className="font-semibold text-2xl text-white">
              <span className="text-green-950">Tourism </span>App
            </div>
            <div className="w-[50%] ">
              <ul className="flex m-auto w-[80%] justify-between items-center">
                <li className="hover:cursor-pointer hover:text-green-950 duration-200 font-semibold text-sm md:text-base text-white">
                  Home
                </li>
                <li className="hover:cursor-pointer hover:text-green-950 duration-200 font-semibold text-sm md:text-base text-white">
                  Discover
                </li>

                <li className="hover:cursor-pointer hover:text-green-950 duration-200 font-semibold text-sm md:text-base text-white">
                  About
                </li>
              </ul>
            </div>
            <div className="font-medium text-base text-white">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
        </nav>

        <div className="relative sm:hidden h-[50vh] w-full overflow-hidden">
          <img src={discoverImage} alt="discover" className="w-full h-full" />
          <div className="text-2xl absolute left-2 z-10 font-[600] top-10">
            Discover
          </div>
        </div>

        <div className="hidden relative w-full sm:flex items-center h-[95vh]">
          <div className="absolute h-[95vh] w-full bg-black opacity-50 top-0"></div>
          <div className="w-[60%] lg:w-[45%] absolute p-8">
            <div>
              <h1 className="text-3xl md:text-5xl text-white font-bold mb-8">
                Discover Algeria Like Never Before.
              </h1>
              <p className="text-base md:text-lg text-white opacity-90 font-medium">
                Unveil the hidden gems of Algeria, from the vast Sahara Desert
                to the stunning Mediterranean coastline. Our app guides you
                through breathtaking landscapes, ancient ruins, and vibrant
                cities.
              </p>
            </div>
          </div>
          <img src={homeImage3} alt="" className="w-full h-full max-h-[95vh]" />
        </div>

        <section className="w-full p-4 h-fit relative z-50 sm:shadow-upperFade">
          <div className="w-[90%] mx-auto my-10 sm:block hidden">
            <div className="text-4xl font-semibold mb-10 text-center hidden sm:block">
              Services
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

          <div className="w-full flex gap-2 items-center justify-around sm:hidden">
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
          <div className="w-[90%] flex  flex-col justify-center">
            <h1 className="text-2xl sm:text-4xl font-semibold sm:mb-10 sm:text-center ">
              Locations
            </h1>
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
                    slidesPerView: 4,
                  },
                }}
                spaceBetween={30}
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
