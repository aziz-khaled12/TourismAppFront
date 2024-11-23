import { IconButton } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import {
  RiBuildingLine,
  RiCarFill,
  RiCarLine,
  RiHome5Fill,
  RiHome5Line,
  RiHotelFill,
  RiHotelLine,
  RiRestaurantFill,
  RiRestaurantLine,
} from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTab } from "../redux/selectedTabSlice"; // Adjust the path accordingly
import WilayaDrawer from "./WilayaDrawer";

const AppBar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const selected = useSelector((state) => state.selectedTab.tab);
  const location = useLocation(); // Get the current location (route)
  const navigate = useNavigate();
  const wilaya = useSelector((state) => state.selectedTab.wilaya);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const services = [
    {
      id: 0,
      icon: <RiHome5Line className="text-xl" />,
      selectedIcon: <RiHome5Fill className="text-xl" />,
      name: "Home",
      link: "/",
    },
    {
      id: 1,
      icon: <RiHotelLine className="text-xl" />,
      selectedIcon: <RiHotelFill className="text-xl" />,
      name: "Hotels",
      link: `/hotels/${wilaya}`,
    },
    {
      id: 2,
      icon: <RiRestaurantLine className="text-xl" />,
      selectedIcon: <RiRestaurantFill className="text-xl" />,
      name: "Resto",
      link: `/restaurants/${wilaya}`,
    },
    // {
    //   id: 3,
    //   icon: <RiCarLine className="text-xl" />,
    //   selectedIcon: <RiCarFill className="text-xl" />,
    //   name: "Cars",
    //   link: "/cars", // Add link for the Cars page if needed
    // },
    {
      id: 4,
      icon: <RiBuildingLine className="text-xl" />,
      selectedIcon: <RiBuildingLine className="text-xl" />,
      name: "Places",
      link: "/places",
      desc: "Find and explore local attractions easily with our interactive map and search feature, helping you discover popular spots and points of interest.",
    },
  ];

  // Update the selected tab based on the current route
  useEffect(() => {
    const currentPath = location.pathname;

    // Match the current path exactly for Home ("/") and using startsWith for others
    const matchedService = services.find((service) => {
      if (service.link === "/") {
        return currentPath === "/"; // Exact match for the Home page
      }
      return currentPath.startsWith(service.link); // Use startsWith for other paths
    });

    if (matchedService && matchedService.name !== selected) {
      dispatch(setSelectedTab(matchedService.name));
    }
  }, [dispatch, selected, services]);

  const handleSelect = (link) => {
    navigate(link); // Navigate to the link
  };

  const firstTwoServices = services.slice(0, 2); // First two services
  const lastTwoServices = services.slice(2); // Last two services

  return (
    <>
      <div className="w-full h-[100px] mt-2 bg-background"></div>
      <div className="fixed bottom-0 w-full shadow-lg bg-background z-1000 sm:hidden ">
        <div className="w-full flex gap-2 items-center justify-around sm:hidden relative">
          {firstTwoServices.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center justify-center relative "
              onClick={() => handleSelect(service.link)}
            >
              <IconButton
                className={`!p-1 !font-semibold ${
                  selected === service.name
                    ? `!text-green-700`
                    : `!text-[#c3c3c3]`
                }`}
              >
                {selected === service.name
                  ? service.selectedIcon
                  : service.icon}
              </IconButton>
              <div
                className={`
                  text-xs
                  font-semibold
                  ${
                  selected === service.name
                    ? `!text-green-700`
                    : `!text-[#c3c3c3]`
                }`}
              >
                {service.name}
              </div>
            </div>
          ))}

          <div className="flex justify-center my-4">
            <button
              className="bg-green-700 text-sm text-white w-[120px] px-2 py-2 rounded"
              onClick={handleOpen}
            >
              {wilaya}
            </button>
          </div>

          {lastTwoServices.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center justify-center relative "
              onClick={() => handleSelect(service.link)}
            >
              <IconButton
                className={`!p-1 !font-semibold ${
                  selected === service.name
                    ? `!text-green-700`
                    : `!text-[#c3c3c3]`
                }`}
              >
                {selected === service.name
                  ? service.selectedIcon
                  : service.icon}
              </IconButton>
              <div
                className={`
                  text-xs
                  font-semibold
                  ${
                  selected === service.name
                    ? `!text-green-700`
                    : `!text-[#c3c3c3]`
                }`}
              >
                {service.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <WilayaDrawer
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </>
  );
};

export default AppBar;
