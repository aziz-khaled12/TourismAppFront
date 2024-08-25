import React from "react";
import { Button } from "@mui/material";
import { FaDollarSign } from "react-icons/fa6";
import { FiCoffee } from "react-icons/fi";
import { IoBedOutline, IoWifi } from "react-icons/io5";

const HotelRoomCard = ({ room }) => {
  return (
    <div className="w-full">
      <div className="w-full ">
        
        <img src={room.image_url} alt="roomImage" className="w-full h-auto"/>
      </div>
      <div className="p-4">
        <div className="font-semibold text-3xl mb-5">
          Room for 2 adults
        </div>
        <div className="flex items-center gap-2 flex-wrap mb-5">
          <Button
            startIcon={
              <IoBedOutline className="!text-2xl !flex !items-center !text-green-700" />
            }
            className="!rounded-full !font-semibold !px-4 !py-3 !text-lg !normal-case !text-black items-baseline !border !border-[#9e9e9e] !border-solid"
          >
            {room.capacity}
          </Button>
          <Button
            startIcon={
              <FaDollarSign className="!text-2xl !flex !items-center !text-green-700" />
            }
            className="!rounded-full !font-semibold !px-4 !py-3 !text-lg !normal-case !text-black items-baseline !border !border-[#9e9e9e] !border-solid"
          >
            {room.price}
          </Button>
          <Button
            startIcon={<IoWifi className="!text-2xl !flex !items-center !text-green-700" />}
            className="!rounded-full !font-semibold !px-4 !py-3 !text-lg !normal-case !text-black items-baseline !border !border-[#9e9e9e] !border-solid"
          >
            WI-FI
          </Button>
          <Button
            startIcon={<FiCoffee className="!text-2xl !flex !items-center !text-green-700" />}
            className="!rounded-full !font-semibold !px-4 !py-3 !text-lg !normal-case !text-black items-baseline !border !border-[#9e9e9e] !border-solid"
          >
            Breakfast
          </Button>
        </div>
        <Button
          variant="contained"
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
      </div>
    </div>
  );
};

export default HotelRoomCard;
