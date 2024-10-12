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
import { OneEightyRingWithBg } from "react-svg-spinners";
import Header from "./Header";

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
        <OneEightyRingWithBg className="!text-primary" />
      </div>
    </>
  ) : (
    <div className="w-full flex flex-col justify-start items-center min-h-screen overflow-hidden">
      <Header
        handleBack={handleBack}
        title={`Restaurants in ${wilaya}`}
        map={true}
      />

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
