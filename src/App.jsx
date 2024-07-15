import React from "react";
import MapComponent from "./components/MapComponent";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/map" element={<MapComponent />}/>
    </Routes>
    </>
  );
}

export default App;
