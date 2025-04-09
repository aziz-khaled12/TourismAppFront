import React from "react"
import { setDragging } from "../../redux/mapSlice";
import { useDispatch } from "react-redux";
import CarBookingDrawer from "./CarBookingDrawer";
import { useState } from "react";
import { MdLocalTaxi } from "react-icons/md";

const CarBooking = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // State for Drawer
  const dispatch = useDispatch();
  return (
    <>
      <div
        onTouchStart={() => dispatch(setDragging(true))}
        onTouchEnd={() => dispatch(setDragging(false))}
        className="p-3 text-2xl text-green-700 absolute bottom-[180px] sm:bottom-8 shadow-custom left-5 bg-background rounded-full transition-all duration-200 hover:bg-green-700 hover:text-background flex items-center justify-center cursor-pointer z-500"
        onClick={() => setDrawerOpen(true)}
      >
        <MdLocalTaxi />
      </div>
      <CarBookingDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </>
  );
};

export default CarBooking;
