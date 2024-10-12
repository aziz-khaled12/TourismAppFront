import { IconButton } from "@mui/material";
import React, { useRef, useEffect } from "react";
import {
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

const AppBar = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.selectedTab.selected);
  const location = useLocation(); // Get the current location (route)
  const [linePosition, setLinePosition] = React.useState(0);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const services = [
    {
      id: 0,
      icon: <RiHome5Line className="text-4xl" />,
      selectedIcon: <RiHome5Fill className="text-4xl" />,
      name: "Home",
      link: "/",
    },
    {
      id: 1,
      icon: <RiHotelLine className="text-4xl" />,
      selectedIcon: <RiHotelFill className="text-4xl" />,
      name: "Hotels",
      link: "/hotels",
    },
    {
      id: 2,
      icon: <RiRestaurantLine className="text-4xl" />,
      selectedIcon: <RiRestaurantFill className="text-4xl" />,
      name: "Restaurants",
      link: "/restaurants",
    },
    {
      id: 3,
      icon: <RiCarLine className="text-4xl" />,
      selectedIcon: <RiCarFill className="text-4xl" />,
      name: "Cars",
      link: "/cars", // Add link for the Cars page if needed
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
  }, [location.pathname, dispatch, selected, services]);

  const handleSelect = (selected, link) => {
    navigate(link); // Navigate to the link
  };

  // Calculate the position of the selected button
  useEffect(() => {
    const selectedButton = containerRef.current?.querySelector(
      `[data-name="${selected}"]`
    );
    if (selectedButton) {
      const buttonRect = selectedButton.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      setLinePosition(
        buttonRect.left - containerRect.left + buttonRect.width / 2
      );
    }
  }, [selected]);

  return (
    <div className="fixed bottom-0 w-full p-6 shadow-lg bg-background z-1000 sm:hidden ">
      <div
        className="w-full flex gap-2 items-start justify-around sm:hidden relative"
        ref={containerRef}
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center justify-center relative "
            onClick={() => handleSelect(service.name, service.link)}
            data-name={service.name}
          >
            <IconButton
              className={`!p-2 !font-semibold ${
                selected === service.name
                  ? `!text-green-700`
                  : `!text-[#c3c3c3]`
              }`}
            >
              {selected === service.name ? service.selectedIcon : service.icon}
            </IconButton>
          </div>
        ))}
        <div
          className="absolute left-0 bottom-0 h-1 bg-green-700 transition-all duration-300"
          style={{
            width: "15px", // Width of the line
            transform: `translateX(${linePosition - 7}px)`, // Centering the line under the selected button
          }}
        />
      </div>
    </div>
  );
};

export default AppBar;
