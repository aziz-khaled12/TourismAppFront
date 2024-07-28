import React from "react";
import MapComponent from "./components/MapComponent";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import HotelSearch from "./components/HotelSearch";
import { useAuth } from "./context/AuthContext";
import PortectedRoutes from "./utils/PortectedRoutes";
import HotelResults from "./components/HotelResults";
function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <div className="w-full bg-[#f9f9f9]">
        <Routes>
          {" "}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PortectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/hotel" element={<HotelSearch />} />
            <Route path="/hotel/:wilaya" element={<HotelResults />} />
            <Route path="/map" element={<MapComponent />} />
          </Route>
        </Routes>{" "}
      </div>{" "}
    </>
  );
}

export default App;
