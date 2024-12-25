import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import FiltersDrawer from "./FiltersDrawer";
import { useNavigate, useParams } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import HotelRoomCard from "./HotelRoomCard";
import "swiper/css";
import FiltersSwiper from "./FiltersSwiper";
import { Grid } from "@mui/material";
import { OneEightyRingWithBg } from "react-svg-spinners";
import Header from "../Helpers/Header";


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
  }, [date]);

  return loading ? (
    <>
      <div className="w-full min-h-screen flex items-center justify-center flex-col m-auto">
      <OneEightyRingWithBg className="!text-primary" />

      </div>
    </>
  ) : (
    <div className="w-full flex flex-col justify-start items-center min-h-screen overflow-hidden">
      

      <Header handleBack={handleBack} title={"Rooms"} map={false} />

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

      <Grid container spacing={2}>
        {rooms.map((room, index) => (
          <Grid item key={index} xs={12} custom={6} lg={4}>
            <HotelRoomCard
              room={room}
              date={date}
              people={people}
              roomsNum={roomsNum}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HotelRooms;
