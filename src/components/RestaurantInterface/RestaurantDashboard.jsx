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
  Divider,
  Menu,
} from "@mui/material";
import {
  MdOutlineMiscellaneousServices,
  MdSpaceDashboard,
} from "react-icons/md";
import { IoBed } from "react-icons/io5";
import { FaCalendarCheck } from "react-icons/fa";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { GetData } from "../../datafetch/users";
import RestaurantMenu from "./RestaurantMenu";


const RestaurantDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard"); // State to track the active section
  const [anchorEl, setAnchorEl] = useState(null);
  const [resto, setResto] = useState();
  const [loading, setLoading] = useState(true);
  const open = Boolean(anchorEl);
  const { logout, user, accessToken } = useAuth();


  useEffect(() => {
    console.log(resto);
  }, [resto])

  const fetchRestaurantData = useCallback(async () => {
    setLoading(true);
    try {
      await GetData(user, setResto, accessToken, "restaurant");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user, accessToken]);

  useEffect(() => {
    fetchRestaurantData();
  }, [fetchRestaurantData]);

  const sideButtons = [
    {
      id: 0,
      name: "Dashboard",
      value: "dashboard",
      icon: <MdSpaceDashboard />,
    },
    {
      id: 1,
      name: "Menu",
      value: "menu",
      icon: <IoBed />,
    },
    {
      id: 2,
      name: "Orders",
      value: "orders",
      icon: <FaCalendarCheck />,
    },
    {
      id: 3,
      name: "Archive",
      value: "archive",
      icon: <MdOutlineMiscellaneousServices />,
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
      case "menu":
        return <>{resto && <RestaurantMenu restaurant={resto} />}</>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen ">
      <div className="flex">
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
                  {resto ? resto.name[0] : "H"}
                </Avatar>
                <div className="font-[600] text-md">
                  {resto ? resto.name : "Hotel Name"}
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
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
