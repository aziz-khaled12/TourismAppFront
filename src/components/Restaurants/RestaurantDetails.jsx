import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useParams, useNavigate } from "react-router-dom";
import TruncateMarkup from "react-truncate-markup";
import { Avatar, AvatarGroup, Button, Rating } from "@mui/material";
import { GrFormPrevious } from "react-icons/gr";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/HotelDetails.css";
import RestoImage from "../../assets/resto.jpg";
import { LuClock } from "react-icons/lu";
import { GetRestaurant } from "../../datafetch/restaurants";
import MenuItemCard from "./MenuItemCard";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { RiMapPin2Fill, RiRestaurantFill } from "react-icons/ri";
import { OneEightyRingWithBg } from "react-svg-spinners";
import { useDispatch } from "react-redux";
import { addLocation } from "../../redux/mapSlice";

const url = import.meta.env.VITE_LOCAL_BACK_END_URL;

const RestaurantDetails = () => {
  const { wilaya, id } = useParams();
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState();
  const [workStart, setWorkStart] = useState();
  const [menuItems, setMenuItems] = useState([]);
  const [workend, setWorkend] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [turncate, setTurncate] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      await GetRestaurant(setRestaurant, id, accessToken);
    };
    fetchRestaurant();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const handleDirectionsClick = () => {
    dispatch(
      addLocation([
        [restaurant.lat, restaurant.lon],
      ])
    );
    navigate("/map");
  };

  const longText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum provident voluptatum maxime, totam corporis nihil sequi molestias, temporibus eaque dicta ad magnam vel deserunt. Facere distinctio expedita unde laboriosam aperiam vitae voluptatibus ut esse? Ipsa architecto voluptates sunt magnam, aperiam quam voluptatibus dignissimos placeat voluptatem maiores harum reiciendis. Delectus, saepe?";

  const readMoreEllipsis = (
    <span>
      ...{" "}
      <span
        onClick={() => {
          setTurncate(false);
        }}
        className="text-black text-decoration-line: underline text-lg font-bold"
      >
        Show more
      </span>
    </span>
  );

  const formatTime = (time) => {
    return time.slice(0, 5);
  };

  useEffect(() => {
    if (restaurant) {
      const formattedWorkStart = formatTime(restaurant.work_start);
      const formattedWorkEnd = formatTime(restaurant.work_end);
      setWorkStart(formattedWorkStart);
      setWorkend(formattedWorkEnd);
      setLoading(false);
    }
  }, [restaurant]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(
          `${url}/restaurants/menu/bestItems?id=${id}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setMenuItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMenu();
  }, []);

  return loading ? (
    <div className="w-full min-h-screen flex items-center justify-center flex-col m-auto">
      <OneEightyRingWithBg className="!text-primary" />
    </div>
  ) : (
    <div className="w-full min-h-screen flex flex-col items-center justify-start pb-24 md:pb-0">
    {/* Hero Image Section */}
    <section className="h-[47vh] w-full relative">
      <img
        src={RestoImage}
        alt="hotel room"
        className="w-full h-full object-cover"
      />
      <div className="w-full absolute top-12 flex items-center px-4">
        <Button
          className="!w-12 !h-12 !rounded-full !flex !items-center !justify-center !bg-white !min-w-0"
          onClick={goBack}
        >
          <GrFormPrevious className="text-black text-4xl" />
        </Button>
      </div>
    </section>
  
    {/* Restaurant Info Section */}
    <section className="w-full p-4 mt-2 max-w-6xl">
      <div className="w-full">
        <h1 className="text-2xl md:text-3xl font-[600]">{restaurant.name}</h1>
        
        <div className="text-lg font-[500] opacity-80 flex items-start mt-4">
          <HiOutlineLocationMarker className="text-3xl mr-2" />
          <TruncateMarkup lines={1}>
            <p className="font-bold text-md">
              {restaurant.road}, {restaurant.city}, {restaurant.state}
            </p>
          </TruncateMarkup>
        </div>
        
        <div className="text-lg font-[500] opacity-80 flex items-start mt-4">
          <LuClock className="text-3xl mr-2" />
          <p className="font-bold text-md">
            {workStart} : {workend}
          </p>
        </div>
      </div>
    </section>
  
    {/* Description Section */}
    <section className="p-4 w-full max-w-6xl">
      {turncate ? (
        <TruncateMarkup ellipsis={readMoreEllipsis} lines={2}>
          <p className="text-lg text-lightText">{longText}</p>
        </TruncateMarkup>
      ) : (
        <>
          <p className="text-lg text-lightText">{longText}</p>
          <span
            onClick={() => {
              setTurncate(true);
            }}
            className="text-black text-decoration-line: underline text-lg font-bold"
          >
            Show less
          </span>
        </>
      )}
    </section>
  
    {/* Reviews Section */}
    <section className="w-full p-4 max-w-6xl">
      <div className="bg-lightBackground flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl">
        <div className="mb-4 sm:mb-0">
          <div className="mb-2 text-lightText text-bold text-md">
            Total: 3.3k Reviews
          </div>
          <Rating
            readOnly
            icon={<FaStar fontSize="inherit" className="!mr-1" />}
            emptyIcon={<FaRegStar fontSize="inherit" className="!mr-1" />}
            defaultValue={restaurant.rating}
          ></Rating>
        </div>
        <div>
          <AvatarGroup>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
        </div>
      </div>
    </section>
  
    {/* Top Sellers Section */}
    <section className="w-full p-4 max-w-6xl">
      <div className="w-full p-4 mt-2">
        <h1 className="font-bold text-xl md:text-2xl">Top Sellers</h1>
      </div>
      {menuItems.length > 0 && (
        <div className="w-full p-4">
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            breakpoints={{
              320: {
                slidesPerView: 1.2,
                spaceBetween: 10
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20
              },
            }}
          >
            {menuItems.map((menuItem, index) => {
              return (
                <SwiperSlide key={index}>
                  <MenuItemCard menuItem={menuItem} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </section>
  
    {/* Map Section */}
    <section className="min-h-[25vh] flex items-center justify-center flex-col w-full p-4 rounded-xl max-w-6xl pb-20">
      <div className="w-full p-4 mt-2">
        <h1 className="font-bold text-xl md:text-2xl">Location</h1>
        <p className="text-lightText text-md">
          {restaurant.road}, {restaurant.city}
        </p>
      </div>
      <div className="w-full h-[40vh] md:h-[50vh] p-4">
        <MapContainer
          center={[restaurant.lat, restaurant.lon]}
          zoom={17}
          className="h-full w-full rounded-lg"
          minZoom={5}
        >
          <TileLayer
            url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=sk.eyJ1Ijoia2hhbGVkYXppejExIiwiYSI6ImNseWhnM3FvNDA0MWgya3F5ZzVsMzRwYWEifQ.rA8VFAxykZnsT2AG1HwpsQ"
            attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
          />
          <Marker position={[restaurant.lat, restaurant.lon]}></Marker>
        </MapContainer>
      </div>
    </section>
  
    {/* Bottom Fixed Buttons */}
    <div className="fixed bottom-0 w-full bg-white p-4 gap-2 z-1000 shadow-lg flex justify-around  mx-auto">
      <Button
        variant="contained"
        className="flex-1 mx-2 !bg-green-700 !min-h-[50px]"
        onClick={handleDirectionsClick}
      >
        <RiMapPin2Fill className="mr-2" />
        Directions
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          navigate(`/restaurants/${wilaya}/${id}/menu`);
        }}
        className="flex-1 mx-2 !bg-green-700 !min-h-[50px]"
      >
        <RiRestaurantFill className="mr-2" />
        See Menu
      </Button>
    </div>
  </div>
  );
};

export default RestaurantDetails;
