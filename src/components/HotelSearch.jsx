import React, { useEffect, useState } from "react";
import GeocoderComponent from "./GeocoderControl"; 
import { GetHotels } from "../datafetch/locations";
import { useAuth } from "../context/AuthContext";

const HotelSearch = () => {
  const [hotels, setHotels] = useState();
  const { accessToken } = useAuth();

  
  useEffect(() => {
    const fetchHotels = async () => {
      await GetHotels(setHotels, accessToken);
    };
    fetchHotels();
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center flex-col m-auto">
      <div className="w-full flex items-center p-4">
        <GeocoderComponent data={hotels} type="hotel"/>
      </div>
    </div>
  );
};

export default HotelSearch;
