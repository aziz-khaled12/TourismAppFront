import React, { useEffect, useState } from "react";
import { GetHotel } from "../../datafetch/hotels";
import { useAuth } from "../../context/AuthContext";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import TruncateMarkup from "react-truncate-markup";
import { AppBar, Avatar, AvatarGroup, Button, Rating } from "@mui/material";
import { IoBedOutline, IoCalendarNumberOutline } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { GrFormPrevious } from "react-icons/gr";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/HotelDetails.css";
import { GetNearby } from "../../datafetch/restaurants";
import RestaurantCard from "../Restaurants/RestaurantCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { OneEightyRingWithBg } from "react-svg-spinners";

const mapBoxToken = import.meta.env.VITE_AccessToken;


const HotelDetails = () => {
  const { wilaya, id } = useParams();
  const { accessToken } = useAuth();
  const [hotel, setHotel] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [nearby, setNearby] = useState();
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const rooms = queryParams.get("rooms");
  const people = queryParams.get("people");
  const PreParsedDate = queryParams.get("date");
  const parsedDate = PreParsedDate
    ? JSON.parse(decodeURIComponent(PreParsedDate))
    : null;

  const date =
    parsedDate &&
    parsedDate.map((d) => ({
      startDate: new Date(d.startDate),
      endDate: new Date(d.endDate),
      key: d.key,
    }));

  const radius = 5000;

  const [turncate, setTurncate] = useState(true);

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

  useEffect(() => {
    const fetchHotel = async () => {
      await GetHotel(setHotel, id, accessToken);
    };
    fetchHotel();
  }, []);

  const fetchNearby = async () => {
    await GetNearby(setNearby, hotel.lat, hotel.lon, radius, accessToken);
  };

  useEffect(() => {
    if (hotel) {
      fetchNearby();
    }
  }, [hotel]);

  useEffect(() => {
    if (nearby) {
      const sortedRestaurants = nearby
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
      setRestaurants(sortedRestaurants);
    }
  }, [nearby]);

  useEffect(() => {
    console.log("nearby: ", nearby);
  }, [nearby]);

  const goBack = () => {
    navigate(`/hotels/${wilaya}`);
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

  useEffect(() => {
    if (hotel) {
      setLoading(false);
    }
  }, [hotel]);

  return loading ? (
    <>
      <div className="w-full min-h-screen flex items-center justify-center flex-col m-auto">
      <OneEightyRingWithBg className="!text-primary" />

      </div>
    </>
  ) : (
    <div className="w-full min-h-screen flex flex-col items-center justify-start mb-28">
    {/* Hero Image Section */}
    <section className="h-[47vh] w-full relative">
      <img
        src={hotel.image_url[0]}
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
  
    {/* Hotel Info Section */}
    <section className="w-full p-4 mt-2 max-w-6xl">
      <div className="w-full">
        <h1 className="text-2xl md:text-3xl font-[600]">{hotel.name}</h1>
        <div className="text-lg font-[500] opacity-80 flex items-start mt-4">
          <HiOutlineLocationMarker className="text-3xl mr-2" />
          <TruncateMarkup lines={1}>
            <p>
              {hotel.road}, {hotel.city}, {hotel.state}
            </p>
          </TruncateMarkup>
        </div>
      </div>
    </section>
  
    {/* Booking Details Section - Responsive Layout */}
    <section className="flex flex-wrap items-center justify-center gap-4 mx-4 w-full max-w-6xl">
      <Button
        startIcon={
          <IoCalendarNumberOutline className="!text-2xl !flex !items-center" />
        }
        className="!min-w-[220px] md:!min-w-[280px] !rounded-full !font-semibold !px-4 !py-3 !text-lg !normal-case !text-black items-baseline !border !border-[#9e9e9e] !border-solid"
      >
        {date[0].startDate.getDate()} {monthNames[date[0].startDate.getMonth()]}
        <MdArrowRightAlt className="!text-3xl mx-1" />{" "}
        {date[0].endDate.getDate()} {monthNames[date[0].endDate.getMonth()]}
      </Button>
  
      <Button
        startIcon={<IoBedOutline className="!text-2xl !flex !items-center" />}
        className="!min-w-[120px] md:!min-w-[150px] !rounded-full !font-semibold !px-4 !py-3 !text-lg !normal-case !text-black items-baseline !border !border-[#9e9e9e] !border-solid"
      >
        {rooms}
      </Button>
  
      <Button
        startIcon={<GoPeople className="!text-2xl !flex !items-center" />}
        className="!min-w-[120px] md:!min-w-[150px] !rounded-full !font-semibold !px-4 !py-3 !text-lg !normal-case !text-black items-baseline !border !border-[#9e9e9e] !border-solid"
      >
        {people}
      </Button>
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
            defaultValue={hotel.rating}
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
  
    {/* Map Section */}
    <section className="w-full max-w-6xl p-4 rounded-xl">
      <div className="w-full p-4 mt-2">
        <h1 className="font-bold text-xl md:text-2xl">Location</h1>
        <p className="text-lightText text-md">
          {hotel.road}, {hotel.city}
        </p>
      </div>
      <div className="w-full h-[40vh] md:h-[50vh] p-4">
        <MapContainer
          center={[hotel.lat, hotel.lon]}
          zoom={17}
          className="h-full w-full rounded-lg"
          minZoom={5}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapBoxToken}`}
            attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
          />
          <Marker position={[hotel.lat, hotel.lon]}></Marker>
        </MapContainer>
      </div>
    </section>
  
    {/* Nearby Restaurants Section */}
    <section className="w-full p-4 max-w-6xl flex flex-col justify-start items-start">
      <div className="font-bold text-xl md:text-2xl">Restaurants Nearby</div>
      <div className="w-full p-2 mt-2">
        <Swiper 
          spaceBetween={10} 
          slidesPerView={1.2}

        >
          {restaurants &&
            restaurants.map((resto, index) => (
              <SwiperSlide key={index}>
                <RestaurantCard resto={resto} wilaya={wilaya} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  
    {/* Fixed Bottom App Bar */}
    <AppBar
      position="fixed"
      className="!bg-white !border-t !border-solid !border-lightText"
      sx={{ top: "auto", bottom: 0 }}
    >
      <div className="w-full px-4 py-4 md:py-6 !text-black flex items-center justify-between max-w-6xl mx-auto">
        <div>
          <div className="!text-lightText !font-bold !text-md">Price</div>
          <div className="!text-2xl font-extrabold">
            $2500
            <span className="!text-lightText !text-lg font-bold"> /night</span>
          </div>
        </div>
        <Button
          onClick={() => {
            navigate(`/hotels/${wilaya}/${hotel.id}/rooms`);
          }}
          variant="contained"
          sx={{
            backgroundColor: "#15803d",
            borderRadius: "8px",
            paddingY: "12px",
            fontSize: "16px",
            fontWeight: "500",
            textTransform: "none",
            paddingX: "20px"
          }}
        >
          Book now
        </Button>
      </div>
    </AppBar>
  </div>
  );
};

export default HotelDetails;
