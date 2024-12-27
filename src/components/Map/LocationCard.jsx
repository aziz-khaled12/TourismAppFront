import React from "react";
import hotelImage from "../../assets/hotelImage.jpg";
import Rating from "@mui/material/Rating";

const LocationCard = ({ location, num }) => {
  console.log(location);
  return (
    <div className="h-30 w-[250px]">
      <div className="relative">
        <img
          src={
            location.image_url && location.image_url[0] !== null
              ? location.image_url[0]
              : hotelImage
          }
          alt="location"
          className="h-full w-full relative rounded-t-lg max-h-[180px]"
        />
        <div className="bg-white text-black text-xs p-2 font-bold absolute z-10 m-2 right-0 bottom-0 text-start rounded-md">
          2500DZD
        </div>
      </div>
      <div className="p-2 items-start justify-between w-full h-[30%]">
        <h4 className="my-1 font-semibold text-xl">{location.name}</h4>
        <h1 className="my-1 text-base font-medium"> {location.road}</h1>
        <div className="my-2 text-base flex items-center gap-1">
          {location.rating}
          <Rating
            name="read-only"
            value={location.rating}
            precision={0.5}
            size="small"
            readOnly
          />
          ({num})
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
