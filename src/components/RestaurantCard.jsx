import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RestoImage from "../assets/resto.jpg";
import Rating from "@mui/material/Rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import TruncateMarkup from "react-truncate-markup";


const RestaurantCard = ({ resto, wilaya }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("resto: ", resto);
  }, [resto]);



  const goToResto = () => {
    navigate(`/restaurants/${wilaya}/${resto.id}`);
  };

  return (
    resto && (
      <>
        <Button onClick={goToResto} className="!text-primary !w-full !mb-4">
          <div className="w-full flex items-center justify-start">
            <div className="w-[100px] h-[100px] mr-6">
              <img src={RestoImage} alt="resto" className="w-full h-full rounded-lg" />
            </div>

            <div className="flex flex-col items-start justify-between">
              <div className="text-lg font-[600]">
                <TruncateMarkup lines={1}>
                  <p>{resto.name}</p>
                </TruncateMarkup>
              </div>
              <div className="text-sm font-[500] opacity-80 flex items-start my-2">
                <HiOutlineLocationMarker className="text-[1.3rem] mr-2" />
                <TruncateMarkup lines={1}>
                  <p>
                    {resto.road}, {resto.city}, {resto.state}
                  </p>
                </TruncateMarkup>
              </div>
              <Rating
                readOnly
                icon={<FaStar fontSize="inherit" className="!mr-2" />}
                emptyIcon={<FaRegStar fontSize="inherit" className="!mr-2" />}
                defaultValue={resto.rating}
              ></Rating>
            </div>
          </div>
        </Button>
      </>
    )
  );
};

export default RestaurantCard;
