import React from "react";
import hotelImage from "../../assets/hotelImage.jpg";
import Rating from "@mui/material/Rating";


const HotelCard = ({ hotel, num }) => (
  <div className="h-30 w-[250px]">
    <div className="relative">
      <img src={ hotel.image_url && hotel.image_url[0] !== null ? hotel.image_url[0] : hotelImage} alt="hotel" className="h-full w-full relative rounded-t-lg max-h-[180px]" />
      <div className="bg-white text-black text-xs p-2 font-bold absolute z-10 m-2 right-0 bottom-0 text-start rounded-md">
        price: 2500DZD
      </div>
    </div>
    <div className="p-2 items-start justify-between w-full h-[30%]">
      <h4 className="my-1 font-semibold text-xl">{hotel.name}</h4>
      <h1 className="my-1 text-base font-medium"> {hotel.road}</h1>
      <div className="my-2 text-base flex items-center gap-1">
        {hotel.rating} 
        <Rating
          name="read-only"
          value={hotel.rating}
          precision={0.5}
          size="small"
          readOnly
        /> 
        ({num})
      </div>
    </div>
  </div>
);

export default HotelCard;
