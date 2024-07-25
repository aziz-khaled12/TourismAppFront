import React from "react";
import hotelImage from "../assets/hotelImage.jpg";
import Rating from "@mui/material/Rating";


const HotelCard = ({ name, address, rating, num }) => (
  <div className="h-30 w-[250px]">
    <div className="relative">
      <img src={hotelImage} alt="hotel" className="h-full w-full relative" />
      <div className="bg-white text-black text-xs p-2 font-bold absolute z-10 m-2 right-0 bottom-0 text-start rounded-md">
        price: 2500DZD
      </div>
    </div>
    <div className="p-2 items-start justify-between w-full h-[30%]">
      <h4 className="my-1 font-[500] text-xl">{name}</h4>
      <h1 className="my-1 text-base">{address}</h1>
      <div className="my-2 text-base flex items-center gap-1">
        {rating}{" "}
        <Rating
          name="read-only"
          value={rating}
          precision={0.5}
          size="small"
          readOnly
        />{" "}
        ({num})
      </div>
    </div>
  </div>
);

export default HotelCard;
