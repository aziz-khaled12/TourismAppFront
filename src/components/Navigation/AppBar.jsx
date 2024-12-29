import React, { useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiHome5Line, RiHome5Fill,
  RiMapLine,
  RiCarLine, RiCarFill
} from 'react-icons/ri';

import { setSelectedTab } from '../../redux/selectedTabSlice';

const AppBar = () => {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state) => state.selectedTab.tab);
  const location = useLocation();
  const navigate = useNavigate();

  // Memoize services array to prevent unnecessary re-renders
  const services = useMemo(() => [
    {
      id: 0,
      icon: <RiHome5Line className="text-xl" />,
      selectedIcon: <RiHome5Fill className="text-xl" />,
      name: "Home",
      link: "/",
    },
    {
      id: 1,
      icon: <RiMapLine className="text-2xl" />,
      selectedIcon: <RiMapLine className="text-2xl text-green-700" />,
      name: "Map",
      link: "/map",
    },
    {
      id: 2,
      icon: <RiCarLine className="text-xl" />,
      selectedIcon: <RiCarFill className="text-xl" />,
      name: "Cars",
      link: "/cars",
    },
  ], []);

  
  useEffect(() => {
    const currentPath = location.pathname;
    const matchedService = services.find((service) => 
      service.link === "/" ? currentPath === "/" : currentPath.startsWith(service.link)
    );

    if (matchedService && matchedService.name !== selectedTab) {
      dispatch(setSelectedTab(matchedService.name));
    }
  }, [location.pathname, selectedTab, services, dispatch]);

  const handleSelect = (link) => {
    navigate(link);
  };

  const NavButton = ({ service }) => {
    const isSelected = selectedTab === service.name;

    return (
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center justify-center relative"
        onClick={() => handleSelect(service.link)}
      >
        <button
          className={`p-2 rounded-full transition-colors duration-200 ${
            isSelected 
              ? 'bg-green-50 text-green-700' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
          aria-label={service.name}
        >
          {isSelected ? service.selectedIcon : service.icon}
        </button>
        
        <span
          className={`text-xs font-medium transition-colors duration-200 ${
            isSelected ? 'text-green-700' : 'text-gray-400'
          }`}
        >
          {service.name}
        </span>
      </motion.div>
    );
  };

  return (
    <>
      <div className={`w-full h-[72px] sm:hidden ${selectedTab === "Map" ? "hidden" : ""} mt-2 bg-background`} />
      <AnimatePresence>
        <motion.nav
          initial={{ y: -100 }}
          animate={{ 
            y: 0,
            bottom: selectedTab === "Map" ? 16 : 0
          }}
          transition={{ duration: 0.3 }}
          className="fixed flex items-center justify-center w-full z-1000 sm:hidden"
        >
          <motion.div
            animate={{
              width: selectedTab === "Map" ? "90%" : "100%",
              borderRadius: selectedTab === "Map" ? "9999px" : "0",
            }}
            className="bg-background shadow-lg flex items-center justify-around p-2"
          >
            {services.map((service) => (
              <NavButton key={service.id} service={service} />
            ))}

            {selectedTab === "Map" && (
              <NavButton />
            )}
          </motion.div>
        </motion.nav>
      </AnimatePresence>
    </>
  );
};

export default AppBar;