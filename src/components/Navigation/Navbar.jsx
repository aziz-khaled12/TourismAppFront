import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import WilayaDrawer from "./WilayaDrawer";
import ServicesSwiper from "./ServicesSwiper";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const currentTab = useSelector((state) => state.selectedTab.tab);
  console.log("currentTab", currentTab);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpen = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <nav
        className={`w-full py-4 fixed ${isScrolled ? "bg-background" : "bg-transparent"} shadow-lg h-[20vh] transition-all duration-300 ease-in-out sm:block hidden z-[60]`}
      >
        <div className="w-full  px-10 flex justify-between items-center ">
          <div
            className={`font-semibold sm:text-xl lg:text-2xl transition-all duration-300 ${
              isScrolled ? "text-primary " : "text-black"
            }`}
          >
            <span className="text-green-700">Tourism </span>App
          </div>
          <div className="w-[50%] ">
            <WilayaDrawer
              open={openDrawer}
              handleOpen={handleOpen}
              handleClose={handleCloseDrawer}
            />
          </div>
          <div className="font-medium text-base text-primary">
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
        <ServicesSwiper other={"px-10"} />
      </nav>

      <div
        className={`w-full p-4 gap-1 sm:hidden fixed flex flex-col shadow-md items-center bg-background ${
          currentTab === "Map" ? "bg-transparent" : ""
        } transition-all duration-1000 z-[60] justify-center`}
      >
        <div className="w-[90%]">
          <WilayaDrawer
            open={openDrawer}
            handleOpen={handleOpen}
            handleClose={handleCloseDrawer}
          />
        </div>
        <ServicesSwiper />
      </div>

      <div className={`h-[16vh] `}></div>
    </>
  );
};

export default Navbar;
