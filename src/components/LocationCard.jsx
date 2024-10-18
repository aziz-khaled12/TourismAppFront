/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import hotelImage from "../assets/hotelImage.jpg";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button, IconButton, Rating } from "@mui/material";
import { OneEightyRingWithBg } from "react-svg-spinners";
import TruncateMarkup from "react-truncate-markup";
import { useNavigate } from "react-router-dom";

const LocationCard = ({ data }) => {
  
  const navigate = useNavigate();
  console.log(data)
  const [loading, setLoading] = useState(true);
  const liked = false;
  const { rating, name, state, id } = data;

  const handleDetails = () => {
    navigate(`/places/${id}`);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };
  return (
    <>
      <div className="w-full relative">
        <div className="w-[95%] rounded-lg mx-auto shadow-lg">
          <div className="rounded-full z-10 bg-white absolute top-4 right-6">
            <IconButton aria-label="delete">
              {liked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
            </IconButton>
          </div>
          <div className="w-full p-0 text-start text-black normal-case">
            <div className="w-full mb-3 rounded-lg">
              <div className="relative">
                {loading && (
                  <>
                    <div className="w-full h-[300px] flex items-center justify-center flex-col m-auto">
                      <OneEightyRingWithBg className="!text-primary" />
                    </div>
                  </>
                )}
                <img
                  src={data.image_url != null ? data.image_url[0] : hotelImage}
                  alt="hotel"
                  loading="lazy"
                  onLoad={handleImageLoad}
                  className="h-auto w-full relative max-h-[300px] rounded-t-lg"
                />
              </div>
              <div className="py-2 px-4 items-start justify-between w-full h-[30%]">
                <TruncateMarkup lines={1}>
                  <h4 className="my-1 font-semibold text-lg">{name}</h4>
                </TruncateMarkup>
                <h1 className="my-1 font-medium opacity-50 text-base">
                  {state}
                </h1>
                <div className="flex justify-between items-center">
                  <div className="my-2 text-base flex items-center gap-1">
                    <Rating
                      name="read-only"
                      value={rating}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <Button
                    variant="contained"
                    onClick={handleDetails}
                    className={"!bg-green-700"}
                    sx={{ textTransform: "none" }}
                  >
                    See Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationCard;
