import React, { useEffect, useState } from "react";
import HotelResultCard from "./HotelResultCard";
import { SlArrowLeft } from "react-icons/sl";
import { CiMap } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { GetHotels } from "../datafetch/locations";
import { useAuth } from "../context/AuthContext";

const HotelResults = () => {
  const { accessToken } = useAuth();
  const { wilaya } = useParams();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    GetHotels(setHotels, accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (hotels.length > 0) {
      console.log(hotels);
      const filtered = hotels.filter((hotel) =>
        hotel.address.state.toLowerCase().includes(wilaya.toLowerCase())
      );
      setFilteredHotels(filtered);
    }
  }, [hotels, wilaya]);

  const handleBack = () => {
    navigate("/hotel"); // Go back one page in the browser history
  };

  return (
    <div className="w-full flex flex-col justify-start items-center min-h-screen">
      <div className="w-full mt-10 border-[#6e6e6e] border-b border-solid">
        <div className="w-full flex justify-between p-4 mb-3">
          <div className="flex items-center font-[600] text-xl ">
            <SlArrowLeft className="mr-3 cursor-pointer" onClick={handleBack} />
            Hotels in {wilaya}
          </div>
          <div className="flex items-center text-3xl ">
            <CiMap
              className="cursor-pointer"
              onClick={() => {
                navigate("/map");
              }}
            />
          </div>
        </div>
      </div>
      {filteredHotels.length > 0 ? (
        filteredHotels.map((hotel, index) => (
          <HotelResultCard
            key={index}
            name={hotel.name}
            address={hotel.address.road}
            rating={4}
            num={hotel.num}
          />
        ))
      ) : (
        <p>No hotels found in {wilaya}</p>
      )}
    </div>
  );
};

export default HotelResults;
