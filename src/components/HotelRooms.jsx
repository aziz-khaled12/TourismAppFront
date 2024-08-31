import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import FiltersDrawer from "./FiltersDrawer";
import { useNavigate, useParams } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import HotelRoomCard from "./HotelRoomCard";
import "swiper/css";
import FiltersSwiper from "./FiltersSwiper";

const HotelRooms = () => {
  const url = import.meta.env.VITE_LOCAL_BACK_END_URL;
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [price, setPrice] = useState();
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [roomsNum, setRoomsNum] = useState(1);
  const [people, setPeople] = useState(1);
  const [selectedOption, setSelectedOption] = useState(2);
  const [open, setOpen] = useState(false); // Set to true initially for testing
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const fetchHotelRooms = async () => {
      try {
        setLoading(true);
        const result = await axios.get(`${url}/hotels/rooms/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (result.status == 200) {
          console.log(result.data);
          setRooms(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchHotelRooms();
  }, []);

  useEffect(() => {
    if (rooms) {
      const leastPrice =
        rooms.length > 0
          ? rooms.reduce((minItem, currentItem) => {
              return currentItem.price < minItem.price ? currentItem : minItem;
            })
          : 0;
      setPrice(leastPrice);
    }
  }, [rooms]);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (rooms && price) {
      setLoading(false);
    }
  }, [price, rooms]);

  const toggleDrawer = (newOpen, option) => () => {
    setSelectedOption(option);
    setOpen(newOpen);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const confirmDetails = (prePeople, preRooms) => {
    setPeople(prePeople);
    setRoomsNum(preRooms);
    closeDrawer();
  };

  const applyDate = (preDate) => {
    setDate(preDate);
    closeDrawer();
  };


  useEffect(() => {
    console.log(date);
  }, [date])

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
            Rooms
          </div>
        </div>
      </div>

      <FiltersSwiper
        date={date}
        people={people}
        roomsNum={roomsNum}
        toggleDrawer={toggleDrawer}
      />

      <FiltersDrawer
        toggleDrawer={toggleDrawer}
        applyDate={applyDate}
        confirmDetails={confirmDetails}
        roomsNum={roomsNum}
        people={people}
        open={open}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <div>
        {rooms.map((room, index) => {
          return (
            <HotelRoomCard
              key={index}
              room={room}
              date={date}
              people={people}
              roomsNum={roomsNum}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HotelRooms;
