import React from "react";
import hotelImage from "../assets/hotelImage.jpg";

const LocationCard = () => {
  return (
    <>
      <div
        className={`w-[170px] h-[170px] sm:h-auto sm:w-auto sm:flex-1 sm:max-h-[700px] relative hover:cursor-pointer`}
      >
        <img
          src={hotelImage}
          alt="dfgsdf"
          className={`w-full h-full sm:h-auto max-h-[700px] rounded-lg relative`}
        />
      </div>
    </>
  );
};

export default LocationCard;
