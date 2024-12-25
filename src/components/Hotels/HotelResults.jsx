import React, { useEffect, useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { CiMap } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { GetWilayaHotels } from "../../datafetch/hotels";
import { useAuth } from "../../context/AuthContext";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import HotelResultCard from "./HotelResultCard";
import { Grid, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { VscSettings } from "react-icons/vsc";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLikedItems } from "../../redux/likesSlice";
import "swiper/css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { OneEightyRingWithBg } from "react-svg-spinners";

const HotelResults = () => {
  const { accessToken, user } = useAuth();
  const wilaya = useSelector((state) => state.selectedTab.wilaya);
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [preRooms, setPreRooms] = useState(rooms);

  const [people, setPeople] = useState(1);
  const [prePeople, setPrePeople] = useState(people);
  const [open, setOpen] = useState(false); // Set to true initially for testing
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [preDate, setPreDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dispatch = useDispatch();
  const likedItems = useSelector((state) => state.likes.likedItems);
  const status = useSelector((state) => state.likes.status);

  useEffect(() => {
    if (status === "idle" && accessToken && user) {
      dispatch(fetchLikedItems({ user, token: accessToken, type: "hotel" }));
    }
  }, [dispatch, status, user, accessToken]);

  useEffect(() => {
    console.log(date);
    console.log();
  }, [date]);

  useEffect(() => {
    GetWilayaHotels(setHotels, wilaya, accessToken);
  }, [accessToken, wilaya]);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleDrawer = (newOpen, option) => () => {
    setSelectedOption(option);
    setOpen(newOpen);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const toggleOption = (option) => {
    setSelectedOption(option);
  };

  const incrementRooms = () => {
    setPreRooms(preRooms + 1);
  };

  const decrementRooms = () => {
    if (preRooms > 1) {
      setPreRooms(preRooms - 1);
    }
  };

  const incrementPeople = () => {
    setPrePeople(prePeople + 1);
  };

  const decrementPeople = () => {
    if (prePeople > 1) {
      setPrePeople(prePeople - 1);
    }
  };

  const confirmDetails = () => {
    setPeople(prePeople);
    setRooms(preRooms);
    closeDrawer();
  };

  const applyDate = () => {
    setDate(preDate);
    closeDrawer();
  };

  const Puller = styled("div")(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
  }));

  useEffect(() => {
    if (hotels.length > 0) {
      setLoading(false);
    }
  });

  return loading ? (
    <>
      <div className="w-full h-[80vh] flex items-center justify-center flex-col m-auto">
        <OneEightyRingWithBg className="!text-primary" />
      </div>
    </>
  ) : (
    <div className="w-full flex flex-col justify-start items-center min-h-screen overflow-hidden">


      <div className="flex items-center justify-around m-4 w-full">
        <div className="flex w-full ml-4 h-[60px]">
          <Swiper spaceBetween={10} slidesPerView={3}>
            <SwiperSlide className="!min-w-[220px]">
              <Button
                startIcon={
                  <IoCalendarNumberOutline className="!text-2xl !flex !items-center" />
                }
                onClick={toggleDrawer(true, 1)}
                className="!min-w-[220px] !rounded-full !font-semibold !px-4 !py-3 !text-md !normal-case !text-black items-baseline !border !border-[#9e9e9e] !border-solid"
              >
                {date[0].startDate.getDate()}{" "}
                {monthNames[date[0].startDate.getMonth()]}
                <MdArrowRightAlt className="!text-3xl mx-1" />{" "}
                {date[0].endDate.getDate()}{" "}
                {monthNames[date[0].endDate.getMonth()]}
              </Button>
            </SwiperSlide>
            <SwiperSlide className="!w-[75px]">
              <Button
                startIcon={
                  <IoBedOutline className="!text-2xl !flex !items-center" />
                }
                onClick={toggleDrawer(true, 2)}
                className="!rounded-full !font-semibold !px-4 !py-3 !text-lg !normal-case !text-black items-baseline !border !border-[#9e9e9e] !border-solid"
              >
                {rooms}
              </Button>
            </SwiperSlide>
            <SwiperSlide className="!w-[75px]">
              <Button
                startIcon={
                  <GoPeople className="!text-2xl !flex !items-center" />
                }
                onClick={toggleDrawer(true, 2)}
                className="!rounded-full !font-semibold !px-4 !py-3 !text-lg !normal-case !text-black items-baseline !border !border-[#9e9e9e] !border-solid"
              >
                {people}
              </Button>
            </SwiperSlide>
            <SwiperSlide className="!w-[120px]">
              <Button
                startIcon={
                  <VscSettings className="!text-2xl !flex !items-center" />
                }
                onClick={toggleDrawer(true, 3)}
                className="!rounded-full !font-semibold !px-4 !py-3 !text-lg !normal-case !text-black items-baseline !border !border-[#9e9e9e] !border-solid"
              >
                Filters
              </Button>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div className="w-[full] h-[90vh] relative flex flex-col items-center justify-start">

          <div className="w-full mt-10 border-[#6e6e6e] border-b border-solid">
            <div className="w-full flex justify-between p-4 mb-3">
              <div className="flex items-center font-[600] text-2xl ">
                Details
              </div>
            </div>
          </div>

          <div className="w-full flex px-4 flex-col items-center justify-start">
            <div
              className={`w-full py-8  ${
                selectedOption == 3 ? "hidden" : "block"
              }`}
            >
              <Button
                onClick={() => {
                  toggleOption(1);
                }}
                startIcon={
                  <IoCalendarNumberOutline className="!text-2xl !flex !items-center" />
                }
                className={`!max-w-[210px] !min-w-[200px] !rounded-full !font-semibold !px-4 !py-3 !text-base !normal-case ${
                  selectedOption == 1
                    ? "!text-white !bg-green-700"
                    : "!text-black !bg-transparent"
                } items-baseline !border !border-[#9e9e9e] !border-solid !mr-2`}
              >
                {preDate[0].startDate.getDate()}{" "}
                {monthNames[preDate[0].startDate.getMonth()]}
                <MdArrowRightAlt className="!text-3xl mx-1" />{" "}
                {preDate[0].endDate.getDate()}{" "}
                {monthNames[preDate[0].endDate.getMonth()]}
              </Button>
              <Button
                onClick={() => {
                  toggleOption(2);
                }}
                className={`!rounded-full !font-semibold !px-4 !py-3 !text-lg !normal-case ${
                  selectedOption == 2
                    ? "!text-white !bg-green-700"
                    : "!text-black !bg-transparent"
                } items-baseline !border !border-[#9e9e9e] !border-solid !mr-2`}
              >
                <span className="flex mr-3 items-center justify-end">
                  <IoBedOutline className="!text-3xl !flex !items-center !mr-2" />{" "}
                  {preRooms}
                </span>
                <span className="flex items-center justify-end">
                  <GoPeople className="!text-3xl !flex !items-center !ml-2 mr-2" />{" "}
                  {prePeople}
                </span>
              </Button>
            </div>

            <div className="w-full flex flex-col items-center justify-center">
              {selectedOption == 1 ? (
                <div className="w-full flex flex-col justify-between items-center h-[60vh]">
                  <DateRange
                    className="bg-[#eff2f7]  rounded-lg"
                    editableDateInputs={true}
                    showSelectionPreview={true}
                    onChange={(item) => setPreDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={preDate}
                  />
                  <Button
                    onClick={applyDate}
                    variant="contained"
                    className="!text-xl !py-4 !px-5 !rounded-full !bg-green-700 !normal-case"
                  >
                    Apply Changes
                  </Button>
                </div>
              ) : selectedOption == 2 ? (
                <>
                  <div className="w-full flex flex-col justify-between items-center h-[60vh]">
                    <div className="w-full">
                      <div className="w-full mt-1">
                        <div className="p-6 rounded-xl flex items-center justify-between bg-green-50">
                          <div className="font-bold text-xl">Room</div>
                          <div className="flex items-center justify-around w-[200px]">
                            <Button
                              onClick={decrementRooms}
                              className="!p-0 !rounded-full !bg-white !h-[45px] !w-[45px] !min-w-0 custom-box-shadow"
                            >
                              <FaMinus className="!text-black !text-md" />
                            </Button>
                            <div className="text-2xl font-bold">{preRooms}</div>
                            <Button
                              onClick={incrementRooms}
                              className="!p-0 !rounded-full !bg-white !h-[45px] !w-[45px] !min-w-0 custom-box-shadow"
                            >
                              <FaPlus className="!text-black !text-md" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="w-full mt-6 rounded-xl bg-green-50 ">
                        <div className="p-6  flex items-center justify-between border-b-2 border-solid border-white ">
                          <div className="font-bold text-xl">People</div>
                          <div className="flex items-center justify-around w-[200px]">
                            <Button
                              onClick={decrementPeople}
                              className="!p-0 !rounded-full !bg-white !h-[45px] !w-[45px] !min-w-0 custom-box-shadow"
                            >
                              <FaMinus className="!text-black !text-md" />
                            </Button>
                            <div className="text-2xl font-bold">
                              {prePeople}
                            </div>
                            <Button
                              onClick={incrementPeople}
                              className="!p-0 !rounded-full !bg-white !h-[45px] !w-[45px] !min-w-0 custom-box-shadow"
                            >
                              <FaPlus className="!text-black !text-md" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={confirmDetails}
                      variant="contained"
                      className="!text-xl !py-4 !px-5 !rounded-full !bg-green-700 !normal-case"
                    >
                      Apply Changes
                    </Button>
                  </div>
                </>
              ) : selectedOption == 3 ? (
                "filters"
              ) : (
                "nothing"
              )}
            </div>
          </div>

          <Puller />
        </div>
      </SwipeableDrawer>

      {hotels.length > 0 ? (
        <Grid container spacing={2} p={2}>
          {hotels.map((hotel, index) => (
            <Grid item key={index} xs={12} custom={6} lg={4}>
              <HotelResultCard
                key={index}
                data={hotel}
                wilaya={wilaya}
                rooms={rooms}
                people={people}
                date={date}
                liked={likedItems.includes(hotel.id)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center">
          <p className="font-bold text-3xl text-center p-4 mb-8">
            we could not find any hotels in {wilaya}
          </p>
          <p className="text-xl font-[400]">try searching for something else</p>
        </div>
      )}
    </div>
  );
};

export default HotelResults;
