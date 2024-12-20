import { Divider, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { setSelectedTab } from "../redux/selectedTabSlice";
import "swiper/css";
import {
  RiBuildingLine,
  RiCarLine,
  RiHotelLine,
  RiHome5Line,
  RiHome5Fill,
  RiHotelFill,
  RiRestaurantLine,
  RiRestaurantFill,
  RiCarFill,
} from "react-icons/ri";
import { Pagination, FreeMode } from "swiper/modules";
const ServicesSwiper = ({ other = "" }) => {
  const wilaya = useSelector((state) => state.selectedTab.wilaya);
  const dispatch = useDispatch();
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
      name: "Restaurants",
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

  const navigate = useNavigate();
  const selected = useSelector((state) => state.selectedTab.tab);

  useEffect(() => {
    const currentPath = location.pathname;

    const matchedService = services.find((service) => {
      if (service.link === "/") {
        return currentPath === "/";
      }
      return currentPath.startsWith(service.link);
    });

    if (matchedService && matchedService.name !== selected) {
      dispatch(setSelectedTab(matchedService.name));
    }
  }, [dispatch, selected, services]);

  const swiperRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const slidesToMove = 2;
  const handleSlideChange = (swiper) => {
    setIsAtEnd(swiper.isEnd);
    //removing this will make a bug where the left arrow doesn't disappear when you reach the end
    if (swiper.progress >= 0.95) {
      swiper.setProgress(1, 200);
      setIsAtEnd(true);
    }
    setIsAtStart(swiper.isBeginning);
  };

  const slideNext = () => {
    console.log();
    swiperRef.current?.slideTo(
      swiperRef.current?.activeIndex + slidesToMove,
      200
    );
  };

  const slidePrev = () => {
    swiperRef.current?.slideTo(
      swiperRef.current?.activeIndex - slidesToMove,
      200
    );
  };

  useEffect(() => {
    console.log(swiperRef.current?.isEnd, swiperRef.current?.isBeginning);
    setIsAtStart(swiperRef.current?.isBeginning);
    setIsAtEnd(swiperRef.current?.isEnd);
  }, [swiperRef.current?.isEnd, swiperRef.current?.isBeginning]);

  return (
    <>
      <div className="pt-2 w-full ">
        <Divider />

        <div
          className={`w-full flex relative items-center justify-center pt-2 ${other} `}
        >
          {!isAtStart && (
            <div className="hidden sm:block">
              <button
                onClick={slidePrev}
                className="absolute left-1 top-1/2 transform -translate-y-1/2 z-10 w-[40px] h-[40px] flex items-center justify-center"
              >
                ◀
              </button>
              <div className="absolute left-0 top-0 h-full min-w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-[9]"></div>
            </div>
          )}


          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
            spaceBetween={40}
            className="w-full"
            slidesPerView="auto"
            modules={[Pagination, FreeMode]}
          >
            {services.map((service) => (
              <SwiperSlide className="w-fit" key={service.id}>
                <div
                  key={service.id}
                  className="flex flex-col cursor-pointer items-center justify-center relative"
                  onClick={() => navigate(service.link)}
                >
                  <IconButton
                    className={`!p-1 !font-semibold ${
                      selected === service.name
                        ? `!text-green-700`
                        : `!text-[#a2a2a2]`
                    }`}
                  >
                    {selected === service.name
                      ? service.selectedIcon
                      : service.icon}
                  </IconButton>
                  <div
                    className={`text-sm mt-1 font-medium ${
                      selected === service.name
                        ? `!text-green-700`
                        : `!text-[#a2a2a2]`
                    }`}
                  >
                    {service.name}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {!isAtEnd && (
            <div className="hidden sm:block">
              <div className=" absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-[9]"></div>
              <button
                onClick={slideNext}
                className="absolute rounded-full right-1 top-1/2 transform -translate-y-1/2 w-[40px] h-[40px] flex items-center justify-center z-10"
              >
                ▶
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ServicesSwiper;