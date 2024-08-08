import React, { useState } from "react";
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
import { MdSpaceDashboard } from "react-icons/md";
import { IoBed } from "react-icons/io5";
import { FaCalendarCheck } from "react-icons/fa";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";

const HotelDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard"); // State to track the active section

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const sideButtons = [
    {
      name: "Dashboard",
      value: "dashboard",
      icon: <MdSpaceDashboard />,
    },
    {
      name: "Rooms",
      value: "rooms",
      icon: <IoBed />,
    },
    {
      name: "Bookings",
      value: "bookings",
      icon: <FaCalendarCheck />,
    },
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
            <div className="mb-6 font-[500] text-xl">Rooms</div>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                Rooms
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This is the Rooms section content.
                </Typography>
              </CardContent>
            </Card>
          </>
        );
      case "bookings":
        return (
          <>
            <div className="mb-6 font-[500] text-xl">Bookings</div>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                Bookings
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This is the Bookings section content.
                </Typography>
              </CardContent>
            </Card>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen ">
      {/* Navbar */}
      <nav className=" py-4 px-6 text-primary flex justify-between items-center">
        <h1 className="text-2xl">My Dashboard</h1>
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
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 text-primary p-8">
          <ul>
            <li className="mb-12">
              <Button
                variant="contained"
                fullWidth
                className="!bg-lightBackground !text-primary !flex !justify-center !p-4"
              >
                <Avatar className="mr-4" sx={{ width: 32, height: 32 }}>
                  M
                </Avatar>
                <div className="font-[600] text-md">Mahfoudh lkalb</div>
              </Button>
            </li>

            {sideButtons.map((thing, index) => {
              return (
                <>
                  <li key={index} className="mb-2">
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
                </>
              );
            })}
          </ul>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default HotelDashboard;
