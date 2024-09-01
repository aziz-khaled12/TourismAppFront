import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  MenuItem,
  Avatar,
  ListItemIcon,
  Menu,
  Divider,
} from "@mui/material";
import { MdOutlineMiscellaneousServices, MdSpaceDashboard } from "react-icons/md";
import { IoBed } from "react-icons/io5";
import { FaCalendarCheck } from "react-icons/fa";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import Rooms from "./Rooms";
import { useAuth } from "../../context/AuthContext";
import Bookings from "./Bookings";
import { GetData } from "../../datafetch/users";
import Services from "./Services";

const HotelDashboard = () => {
  const [activeSection, setActiveSection] = useState("rooms"); // State to track the active section
  const [anchorEl, setAnchorEl] = useState(null);
  const [hotel, setHotel] = useState();
  const [loading, setLoading] = useState(true);
  const open = Boolean(anchorEl);
  const { logout, user, accessToken } = useAuth();

  const fetchHotelData = useCallback(async () => {
    setLoading(true);
    try {
      await GetData(user, setHotel, accessToken);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user, accessToken]);

  useEffect(() => {
    fetchHotelData();
  }, [fetchHotelData]);

  const sideButtons = [
    {
      id: 0,
      name: "Dashboard",
      value: "dashboard",
      icon: <MdSpaceDashboard />,
    },
    {
      id: 1,
      name: "Rooms",
      value: "rooms",
      icon: <IoBed />,
    },
    {
      id: 2,
      name: "Bookings",
      value: "bookings",
      icon: <FaCalendarCheck />,
    },
    {
      id: 3,
      name: "Services",
      value: "services",
      icon: <MdOutlineMiscellaneousServices />,
    }
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            <div className="mb-6 font-[500] text-xl">Hi, Welcome back</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Sales
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is some example content for the Sales section.
                  </Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Users
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is some example content for the Users section.
                  </Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Revenue
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is some example content for the Revenue section.
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </>
        );
      case "rooms":
        return (
          <>
            {loading ? (
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
            ) : (
              <Rooms hotel={hotel} />
            )}
          </>
        );
      case "bookings":
        return (
          <>
            {loading ? (
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
            ) : (
              <Bookings hotel={hotel} />
            )}
          </>
        );
        case "services":
          return (
            <>
              {loading ? (
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
              ) : (
                <Services />
              )}
            </>
          );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen ">
      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 text-primary p-8 shadow-lg">
          <ul>
            <li className="p-4 mb-5" key="header">
              <h1 className="text-2xl">Tourism App</h1>
            </li>
            <li className="mb-12" key="hotel-button">
              <Button
                variant="contained"
                fullWidth
                className="!bg-lightBackground !text-primary !p-4"
              >
                <Avatar className="mr-4" sx={{ width: 32, height: 32 }}>
                  {hotel ? hotel.name[0] : "H"}
                </Avatar>
                <div className="font-[600] text-md">
                  {hotel ? hotel.name : "Hotel Name"}
                </div>
              </Button>
            </li>

            {sideButtons.map((thing) => {
              return (
                <li key={thing.id} className="mb-2">
                  <Button
                    startIcon={thing.icon}
                    variant={`${
                      activeSection === thing.value ? "contained" : ""
                    }`}
                    className={`!px-4 !py-3 ${
                      activeSection === thing.value
                        ? "!bg-lightBackground !text-primary"
                        : "!bg-transparent !text-primary hover:!bg-[#f1f1f1]"
                    } !flex !items-center !justify-start`}
                    fullWidth
                    onClick={() => setActiveSection(thing.value)}
                  >
                    <div className="font-[600] text-md">{thing.name}</div>
                  </Button>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
      <div className="flex flex-col h-screen w-full">
        {/* Navbar */}
        <nav className=" py-4 px-6 text-primary flex justify-end items-center">
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
        </nav>
        {/* Content Area */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default HotelDashboard;
