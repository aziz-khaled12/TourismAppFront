import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import HotelRoomCard from "./HotelRoomCard";

const HotelRooms = () => {
  const url = import.meta.env.VITE_LOCAL_BACK_END_URL;
  const { id, wilaya } = useParams();
  const [rooms, setRooms] = useState([]);
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelRooms = async () => {
      try {
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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full flex flex-col justify-start items-center min-h-screen overflow-hidden">
      <div className="w-full mt-10 border-[#6e6e6e] border-b border-solid">
        <div className="w-full flex justify-between p-4 mb-3">
          <div className="flex items-center font-[600] text-xl ">
            <SlArrowLeft className="mr-3 cursor-pointer" onClick={handleBack} />
            Rooms
          </div>
        </div>
      </div>

      <div>
        {rooms.map((room, index) => {
            return <HotelRoomCard key={index} room={room}/>
        })}
      </div>
    </div>
  );
};

export default HotelRooms;
