import React, { useEffect } from "react";
import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import PortectedRoutes from "./utils/PortectedRoutes";
import {
  HotelDashboard,
  RestaurantDashboard,
  Navbar,
  AlertMessage,
  Signup,
  SignupRole,
  Login,
  RoleForm,
  Home,
  HotelSearch,
  HotelResults,
  HotelDetails,
  HotelRooms,
  RestaurantSearch,
  RestaurantResults,
  RestaurantDetails,
  RestaurantMenu,
  Places,
  PlaceDetails,
  MapComponent,
  CarBooking,
  AppBar,
} from "./components";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
  const pathsWithoutNavBar = [
    "/signup",
    "/login",
    "/map",
    "/map/cars",
    "/restaurants/:wilaya/:id",
    "/hotels/:wilaya/:id",
    "/restaurants/:wilaya/:id/menu",
    "/hotels/:wilaya/:id/rooms",
    "/places/:id",
    "/signup/:role",
  ];
  const pathsWithoutAppBar = [
    "/signup",
    "/login",
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

  const isPathWithoutBar = (paths) => paths.some((pattern) =>
    matchPath(pattern, pathname)
  );

  return (
    <>
      <div className="w-full bg-[#f9f9f9] relative overflow-hidden">
        {isAuthenticated && !isPathWithoutBar(pathsWithoutNavBar) && <Navbar />}

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
        </Routes>
        {isAuthenticated && !isPathWithoutBar(pathsWithoutAppBar) && <AppBar />}
      </div>
    </>
  );
}

export default App;
