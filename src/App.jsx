import React, { useEffect } from "react";
import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import PortectedRoutes from "./utils/PortectedRoutes";
import HotelDashboard from "./components/HotelsInterface/HotelDashboard";
import RestaurantDashboard from "./components/RestaurantInterface/RestaurantDashboard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/Navigation/Navbar";
import AlertMessage from "./components/Helpers/AlertMessage";
import Signup from "./components/Auth/Signup";
import SignupRole from "./components/Auth/SignupRole";
import Login from "./components/Auth/Login";
import RoleForm from "./components/Auth/RoleForm";
import Home from "./components/Home/Home";
import HotelSearch from "./components/Hotels/HotelSearch";
import HotelResults from "./components/Hotels/HotelResults";
import HotelDetails from "./components/Hotels/HotelDetails";
import HotelRooms from "./components/Hotels/HotelRooms";
import RestaurantSearch from "./components/Restaurants/RestaurantSearch";
import RestaurantResults from "./components/Restaurants/RestaurantResults";
import RestaurantDetails from "./components/Restaurants/RestaurantDetails";
import RestaurantMenu from "./components/Restaurants/RestaurantMenu";
import Places from "./components/Places/Places";
import PlaceDetails from "./components/Places/PlaceDetails";
import MapComponent from "./components/Map/MapComponent";
import CarBooking from "./components/CarBooking";
import SwipeableTemporaryDrawer from "./components/SwipeableTemporaryDrawer";

// Create a theme with custom breakpoints
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      custom: 800,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function App() {
  const pathsWithoutBar = [
    "/map",
    "/map/cars",
    "/restaurants/:wilaya/:id",
    "/hotels/:wilaya/:id",
    "/restaurants/:wilaya/:id/menu",
    "/hotels/:wilaya/:id/rooms",
    "/places/:id",
    "/signup/:role",
  ];
  const { verifyToken, isAuthenticated, accessToken } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    verifyToken();
    console.log(isAuthenticated);
    const intervalId = setInterval(verifyToken, 15000);
    return () => clearInterval(intervalId);
  }, []);

  // Function to check if the current path matches any of the excluded paths
  const isPathWithoutBar = pathsWithoutBar.some((pattern) =>
    matchPath(pattern, pathname)
  );

  return (
    <>
      <div className="w-full bg-[#f9f9f9] relative overflow-hidden">
      {isAuthenticated && !isPathWithoutBar && <Navbar />}

        <AlertMessage />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/:role" element={<SignupRole />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PortectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<HotelSearch />} />
            <Route path="/hotels/:wilaya" element={<HotelResults />} />
            <Route path="/hotels/:wilaya/:id" element={<HotelDetails />} />
            <Route
              path="/hotels/:wilaya/:id/rooms"
              element={
                <ThemeProvider theme={theme}>
                  <HotelRooms />
                </ThemeProvider>
              }
            />
            <Route path="/hotels/dashboard" element={<HotelDashboard />} />

            <Route path="/restaurants" element={<RestaurantSearch />} />
            <Route
              path="/restaurants/admin"
              element={<RestaurantDashboard />}
            />
            <Route
              path="/restaurants/:wilaya"
              element={<RestaurantResults />}
            />
            <Route
              path="/restaurants/:wilaya/:id"
              element={<RestaurantDetails />}
            />
            <Route
              path="/restaurants/:wilaya/:id/menu"
              element={<RestaurantMenu />}
            />
            <Route path="/places" element={<Places />}></Route>
            <Route path="/places/:id" element={<PlaceDetails />}></Route>
            <Route path="/map" element={<MapComponent />} />
            <Route path="/map/cars" element={<CarBooking />} />
          </Route>
          <Route path="/test" element={<SwipeableTemporaryDrawer />} />
          <Route path="/test2" element={<RoleForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
