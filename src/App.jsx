import React, { useEffect } from "react";
import MapComponent from "./components/MapComponent";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import HotelSearch from "./components/HotelSearch";
import { useAuth } from "./context/AuthContext";
import PortectedRoutes from "./utils/PortectedRoutes";
import HotelResults from "./components/HotelResults";
import HotelDetails from "./components/HotelDetails";
import SwipeableTemporaryDrawer from "./components/SwipeableTemporaryDrawer";

function App() {
  const { verifyToken, isAuthenticated, accessToken } = useAuth();

  useEffect(() => {

    verifyToken();

    const intervalId = setInterval(verifyToken, 15000);
    return () => clearInterval(intervalId);
  }, []);


  return (
    <>
      <div className="w-full bg-[#f9f9f9]">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PortectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/hotel" element={<HotelSearch />} />
            <Route path="/hotels/:wilaya" element={<HotelResults />} />
            <Route path="/hotels/:wilaya/:id" element={<HotelDetails />} />
            <Route path="/map" element={<MapComponent />} />
            <Route path="/test" element={<SwipeableTemporaryDrawer />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
