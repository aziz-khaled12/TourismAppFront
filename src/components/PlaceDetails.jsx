import { Avatar, AvatarGroup, Button, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { GrFormPrevious } from "react-icons/gr";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import { OneEightyRingWithBg } from "react-svg-spinners";
import TruncateMarkup from "react-truncate-markup";
import { useAuth } from "../context/AuthContext";
import { GetPlace } from "../datafetch/locations";
import RestoImage from "../assets/resto.jpg";
import { RiMapPin2Fill, RiRestaurantFill } from "react-icons/ri";

const PlaceDetails = () => {
  const { id } = useParams();
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState();
  const navigate = useNavigate();
  const [turncate, setTurncate] = useState(true);

  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    const fetchPlace = async () => {
      await GetPlace(setPlace, id, accessToken);
    };
    fetchPlace();
  }, []);

  useEffect(() => {
    if (place) {
      setLoading(false);
    }
  }, [place]);

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
    console.log(place);
  }, [place]);

  return loading ? (
    <div className="w-full min-h-screen flex items-center justify-center flex-col m-auto">
      <OneEightyRingWithBg className="!text-primary" />
    </div>
  ) : (
    <div className="w-full min-h-screen flex flex-col items-center justify-start">
      <section className="h-[47vh] w-full relative">
        <img
          src={RestoImage}
          alt="hotel room"
          className="w-full h-full relative"
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
      <section className="w-full p-4 mt-2">
        <div className="w-full">
          <div className="text-2xl font-[600]">{place.name}</div>
          <div className="text-lg font-[500] opacity-80 flex items-start mt-4">
            <HiOutlineLocationMarker className="text-3xl mr-2" />
            <TruncateMarkup lines={1}>
              <p className="font-bold text-md">{place.state}</p>
            </TruncateMarkup>
          </div>
        </div>
      </section>
      <section className="p-4">
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

      <section className="w-full p-4">
        <div className="bg-lightBackground flex items-center justify-between p-4 rounded-xl">
          <div>
            <div className="mb-2 text-lightText text-bold text-md">
              Total: 3.3k Reviews
            </div>
            <Rating
              readOnly
              icon={<FaStar fontSize="inherit" className="!mr-1" />}
              emptyIcon={<FaRegStar fontSize="inherit" className="!mr-1" />}
              defaultValue={place.rating}
            ></Rating>
          </div>
          <div>
            <AvatarGroup>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar
                alt="Trevor Henderson"
                src="/static/images/avatar/5.jpg"
              />
            </AvatarGroup>
          </div>
        </div>
      </section>

      <section></section>

      <section className="min-h-[25vh] flex items-center justify-center flex-col w-full p-4 rounded-xl">
        <div className="w-full p-4 mt-2">
          <h1 className="font-bold text-xl">Location</h1>
          <p className="text-lightText text-md">{place.state}</p>
        </div>
        <div className="w-full h-[40vh] p-4">
          <MapContainer
            center={[place.lat, place.lon]}
            zoom={17}
            className="h-full w-full"
            minZoom={5}
          >
            <TileLayer
              url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=sk.eyJ1Ijoia2hhbGVkYXppejExIiwiYSI6ImNseWhnM3FvNDA0MWgya3F5ZzVsMzRwYWEifQ.rA8VFAxykZnsT2AG1HwpsQ"
              attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
            />
            <Marker position={[place.lat, place.lon]}></Marker>
          </MapContainer>
        </div>
      </section>
      <div className="h-[50px] w-full bg-background"></div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 z-1000 shadow-lg flex justify-around">
        <Button variant="contained" className="flex-1 mx-2 !bg-green-700" onClick={() => {navigate(`/map?lon=${place.lon}&lat=${place.lat}`)}}>
          <RiMapPin2Fill className="mr-2" />
          Directions
        </Button>
      </div>
    </div>
  );
};

export default PlaceDetails;
