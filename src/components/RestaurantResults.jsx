import React, { useEffect, useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { CiMap } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "swiper/css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { GetWilayaRestaurants } from "../datafetch/restaurants";
import RestaurantCard from "./RestaurantCard";

const RestaurantResults = () => {
  const { accessToken } = useAuth();
  const { wilaya } = useParams();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    GetWilayaRestaurants(setRestaurants, wilaya, accessToken);
  }, [accessToken, wilaya]);

  const handleBack = () => {
    navigate("/restaurants");
  };

  useEffect(() => {
    if (restaurants.length > 0) {
      setLoading(false);
    }
  });

  return loading ? (
    <>
      <div className="w-full min-h-screen flex items-center justify-center flex-col m-auto">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <style>{`.spinner_z9k8{transform-origin:center;animation:spinner_StKS .75s infinite linear}@keyframes spinner_StKS{100%{transform:rotate(360deg)}}`}</style>
          <path
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25"
          />
          <path
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
            className="spinner_z9k8"
          />
        </svg>
      </div>
    </>
  ) : (
    <div className="w-full flex flex-col justify-start items-center min-h-screen overflow-hidden">
      <div className="w-full mt-10 border-[#6e6e6e] border-b border-solid">
        <div className="w-full flex justify-between p-4 mb-3">
          <div className="flex items-center font-[600] text-xl ">
            <SlArrowLeft className="mr-3 cursor-pointer" onClick={handleBack} />
            Restaurants in {wilaya}
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

      {restaurants.length > 0 ? (
        <div className="p-2 mt-4">
          {restaurants.map((resto, index) => (
            <RestaurantCard key={index} resto={resto} wilaya={wilaya} />
          ))}
        </div>
      ) : (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center">
          <p className="font-bold text-3xl text-center p-4 mb-8">
            we could not find any restaurants in {wilaya}
          </p>
          <p className="text-xl font-[400]">try searching for something else</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantResults;
