import React from "react";
import hotelImage from "../assets/hotelImage.jpg";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HotelResultCard = ({data, wilaya, rooms, people, date}) => {

  const navigate = useNavigate()
  const {rating, name, address, id} = data
  const dateObject = JSON.stringify(date);
  const encodedDate = encodeURIComponent(dateObject);
  const handleCardClick = () => {
    navigate(`/hotels/${wilaya}/${id}?rooms=${rooms}&people=${people}&date=${encodedDate}`)
  }
  return (
    <Button onClick={handleCardClick} className="!w-full !p-0 !text-start !text-black !normal-case">
      <div className="w-full mb-3">
        <div className="relative">
          <img
            src={hotelImage}
            alt="hotel"
            className="h-full w-full relative"
          />
        </div>
        <div className="py-2 px-4 items-start justify-between w-full h-[30%]">
          <h4 className="my-1 font-[600] text-xl">{name}</h4>

          <h1 className="my-1 font-[500] opacity-50 text-base"> {address}</h1>
          <div className="flex justify-between items-center">
            <div className="my-2 text-base flex items-center gap-1">
              <Rating
                name="read-only"
                value={rating}
                precision={0.5}
                size="Normal"
                readOnly
              />
            </div>
            <div className="font-[600] text-lg">
              2500DA <span className="opacity-50"> /night</span>
            </div>
          </div>
        </div>
      </div>
    </Button>
  );
};

export default HotelResultCard;
