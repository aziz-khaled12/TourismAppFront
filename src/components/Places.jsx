import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationCard from "./LocationCard";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { GetWilayaPlaces } from "../datafetch/locations";
import { useAuth } from "../context/AuthContext";
import { OneEightyRingWithBg } from "react-svg-spinners";

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const wilaya = useSelector((state) => state.selectedTab.wilaya);
  const { accessToken } = useAuth();



  useEffect(() => {
    const fetchWilayaPlaces = async () => {
      GetWilayaPlaces(setPlaces, wilaya, accessToken);
    };
    fetchWilayaPlaces();
  }, [wilaya]);

  useEffect(() => {
    if (places.length > 0) {
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
    <div className="w-full min-h-screen">
      <section className="w-full p-4">
        {places.length > 0 ? (
          <Grid container spacing={2} p={2}>
            {places.map((place, index) => (
              <Grid item key={index} xs={12} custom={6} lg={4}>
                <LocationCard data={place} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <div className="w-full h-[60vh] flex flex-col items-center justify-center">
            <p className="font-bold text-3xl text-center p-4 mb-8">
              we could not find any places in {wilaya}
            </p>
            <p className="text-xl font-[400]">
              try searching for something else
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Places;
