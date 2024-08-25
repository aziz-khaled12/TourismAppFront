import React, { useEffect } from "react";
import MapComponent from "./components/MapComponent";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const { verifyToken, isAuthenticated, accessToken } = useAuth();

  useEffect(() => {
    verifyToken();

    const intervalId = setInterval(verifyToken, 15000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="w-full bg-[#f9f9f9] relative overflow-hidden">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PortectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<HotelSearch />} />
            <Route path="/hotels/:wilaya" element={<HotelResults />} />
            <Route path="/hotels/:wilaya/:id" element={<HotelDetails />} />
            <Route path="/hotels/:wilaya/:id/rooms" element={<HotelRooms />} />
            <Route path="/hotels/dashboard" element={<HotelDashboard />} />
            <Route path="/restaurants" element={<RestaurantSearch />} />
            <Route
              path="/restaurants/:wilaya"
              element={<RestaurantResults />}
            />
            <Route
              path="/restaurants/:wilaya/:id"
              element={<RestaurantDetails />}
            />
            <Route path="/map" element={<MapComponent />} />
            <Route path="/test" element={<SwipeableTemporaryDrawer />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
