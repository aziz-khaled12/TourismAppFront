import React, { useState, useEffect } from "react";
import hotelImage from "../assets/hotelImage.jpg";
import Rating from "@mui/material/Rating";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { addLike, removeLike } from "../redux/likesSlice";

const HotelResultCard = ({ data, wilaya, rooms, people, date, liked }) => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_LOCAL_BACK_END_URL;
  const [loading, setLoading] = useState(true);
  const { accessToken, user } = useAuth();
  const { rating, name, address, id } = data;
  const dateObject = JSON.stringify(date);
  const encodedDate = encodeURIComponent(dateObject);

  const dispatch = useDispatch();

  const handleLike = async () => {
    try {
      const response = await fetch(`${url}/interactions/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          entity_id: id,
          entity_type: "hotel",
          user_id: user.id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(addLike(id));
      } else {
        // Handle errors
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error liking entity:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await fetch(
        `${url}/interactions/unlike?user_id=${user.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ entity_id: id, entity_type: "hotel" }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        dispatch(removeLike(id));
      } else {
        // Handle errors
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error unliking entity:", error);
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleLikeToggle = async () => {
    if (liked) {
      // Handle Unlike
      await handleUnlike(id);
    } else {
      // Handle Like
      await handleLike(id);
    }
  };

  const handleCardClick = () => {
    navigate(
      `/hotels/${wilaya}/${id}?rooms=${rooms}&people=${people}&date=${encodedDate}`
    );
  };

  return (
    <div className="w-full relative">
      <div className="rounded-full z-10 bg-white absolute top-5 right-5">
        <IconButton aria-label="delete" onClick={handleLikeToggle}>
          {liked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
        </IconButton>
      </div>
      <Button
        onClick={handleCardClick}
        className="!w-full !p-0 !text-start !text-black !normal-case"
      >
        <div className="w-full mb-3">
          <div className="relative">
            {loading && (
              <>
                <div className="w-full h-[300px] flex items-center justify-center flex-col m-auto">
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
            )}
            <img
              src={data.image_url != null ? data.image_url[0] : hotelImage}
              alt="hotel"
              loading="lazy"
              onLoad={handleImageLoad}
              className="h-auto w-full relative max-h-[300px]"
            />
          </div>
          <div className="py-2 px-4 items-start justify-between w-full h-[30%]">
            <h4 className="my-1 font-[600] text-xl">{name}</h4>

            <h1 className="my-1 font-[500] opacity-50 text-base"> {address}</h1>
            <div className="flex justify-between items-center">
              <div className="my-2 text-base flex items-center gap-1">
                <Rating
                  name="read-only"
                  value={rating}
                  precision={0.5}
                  size="Normal"
                  readOnly
                />
              </div>
              <div className="font-[600] text-lg">
                2500DA <span className="opacity-50"> /night</span>
              </div>
            </div>
          </div>
        </div>
      </Button>
    </div>
  );
};

export default HotelResultCard;
