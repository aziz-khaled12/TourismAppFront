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
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()

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

  const handleNavigate = (link) => {
    navigate(link)
  }

  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Hotels",
      link: "/hotels",
    },
    {
      name: "Restaurant",
      link: "/restaurants",
    },
  ];

  return (
    <nav
      className={`w-full fixed px-10 py-4 shadow-lg transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-background" : "bg-transparent"
      } sm:block hidden z-[60]`}
    >
      <div className="w-full flex justify-between items-center ">
        <div className={`font-semibold sm:text-xl lg:text-2xl transition-all duration-300 ${isScrolled ? "text-primary" : "text-white"}`}>
          <span className="text-green-700">Tourism </span>App
        </div>
        <div className="w-[50%] ">
          <ul className="flex m-auto w-[80%] justify-between items-center"> 
            {navItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`hover:cursor-pointer hover:text-green-700 duration-200 font-medium transition-all duration-300 text-sm md:text-base ${isScrolled ? "text-primary" : "text-white"}`}
                  onClick={() => {handleNavigate(item.link)}}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
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
    </nav>
  );
};

export default Navbar;
