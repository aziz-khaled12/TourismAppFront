import React, { useEffect } from "react";
import MapComponent from "./components/MapComponent";
import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import { useAuth } from "./context/AuthContext";
import SwipeableTemporaryDrawer from "./components/SwipeableTemporaryDrawer";
import PortectedRoutes from "./utils/PortectedRoutes";
import HotelSearch from "./components/HotelSearch";
import HotelResults from "./components/HotelResults";
import HotelDetails from "./components/HotelDetails";
import RestaurantSearch from "./components/RestaurantSearch";
import RestaurantResults from "./components/RestaurantResults";
import RestaurantDetails from "./components/RestaurantDetails";
import HotelDashboard from "./components/HotelsInterface/HotelDashboard";
import HotelRooms from "./components/HotelRooms";
import RestaurantDashboard from "./components/RestaurantInterface/RestaurantDashboard";
import AlertMessage from "./components/AlertMessage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RestaurantDashboard2 from "./components/RestaurantDashboard2";
import AppBar from "./components/AppBar";
import RestaurantMenu from "./components/RestaurantMenu";
import Places from "./components/Places";
import PlaceDetails from "./components/PlaceDetails";
import CarBooking from "./components/CarBooking";
import SignupRole from "./components/SignupRole";
import RoleForm from "./components/RoleForm";

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
        {isAuthenticated && !isPathWithoutBar && <AppBar />}
      </div>
    </>
  );
}

export default App;
