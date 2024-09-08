import React, { useEffect, useState } from "react";
import { Alert, Button, Chip, Modal } from "@mui/material";
import { IoBedOutline } from "react-icons/io5";
import BookingDrawer from "./BookingDrawer";
import { FaWifi } from "react-icons/fa";
import { MdOutlineFreeBreakfast } from "react-icons/md";

const HotelRoomCard = ({ room, date, people, roomsNum }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => [
    setOpen(false)
  ]

  return (
    <div className="w-full mb-4">
      <div className="w-[95%] rounded-xl mx-auto shadow-lg">
        <div className="w-full rounded-xl p-2">
          <img
            src={room.image_url}
            alt="roomImage"
            className="w-full h-auto rounded-xl"
          />
        </div>
        <div className="p-4">
          <div className="w-full flex justify-between mb-3 items-center">
            <div className="font-semibold text-2xl sm:text-3xl ">{room.price} DZD</div>
            <Alert severity="success" sx={{borderRadius: "99px"}}>Availabale</Alert>
          </div>
          <div className="font-medium sm:font-semibold text-xl mb-3">{room.name ? room.name : "Room Name is null"}</div>
          <div className="flex flex-wrap items-center gap-4 mb-5 py-4 border-t border-b border-solid border-[#d3d3d3]">
            <div className="flex items-center gap-2 text-base sm:text-base rounded-full p-2 font-normal border border-solid border-[#dfdfdf] bg-lightBackground">
              <FaWifi  className="text-lg font-normal" />
              WI-FI.
            </div>
            <div className="flex items-center gap-2 text-base sm:text-base rounded-full p-2 font-normal border border-solid border-[#dfdfdf] bg-lightBackground">
              <IoBedOutline className="text-lg font-normal" />
              <span className="font-bold">{room.single_beds}</span> single bed.
            </div>
            <div className="flex items-center gap-2 text-base sm:text-base rounded-full p-2 font-normal border border-solid border-[#dfdfdf] bg-lightBackground">
              <IoBedOutline className="text-lg font-normal" />
              <span className="font-bold">{room.double_beds}</span> double bed.
            </div>
            <div className="flex items-center gap-2 text-base sm:text-base rounded-full p-2 font-normal border border-solid border-[#dfdfdf] bg-lightBackground">
              <MdOutlineFreeBreakfast className="text-lg font-normal" />
              Breakfast.
            </div>
          </div>
          <Button
            variant="contained"
            onClick={handleOpen}
            fullWidth
            sx={{
              borderRadius: "99px",
              padding: "10px",
              fontSize: "18px",
              fontWeight: "500",
              textTransform: "none",
              backgroundColor: "#15803d",
              "&:hover": {
                backgroundColor: "#15803d",
              },
              "&:active": {
                backgroundColor: "#15803d",
              },
            }}
          >
            Book now
          </Button>

          <BookingDrawer
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            date={date}
            people={people}
            roomsNum={roomsNum}
            room={room}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelRoomCard;
