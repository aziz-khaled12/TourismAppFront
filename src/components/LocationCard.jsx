import React from "react";
import hotelImage from "../assets/hotelImage.jpg";

const LocationCard = () => {
  return (
    <>
      <div
        className={`h-auto w-auto  sm:max-h-[700px] relative hover:cursor-pointer`}
      >
        <img
          src={hotelImage}
          alt="hotel image"
          className={`w-full h-full sm:h-auto max-h-[700px] rounded-lg relative`}
        />
      </div>
    </>
  );
};

export default LocationCard;
