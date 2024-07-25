import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const PortectedRoutes = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ?  <Outlet /> : <Navigate to={'/login'}/> ;
};

export default PortectedRoutes;
