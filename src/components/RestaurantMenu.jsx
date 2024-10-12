import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Autocomplete, Chip, InputAdornment, TextField } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import { OneEightyRingWithBg } from "react-svg-spinners";
import MenuSearcphBox from "./MenuSearcphBox";
import {
  RiDrinks2Fill,
  RiDrinks2Line,
  RiDrinksFill,
  RiDrinksLine,
} from "react-icons/ri";
import { GiHotMeal } from "react-icons/gi";
import { TbSalad } from "react-icons/tb";

const url = import.meta.env.VITE_LOCAL_BACK_END_URL;

const categories = [
  {
    name: "Cold Drinks",
    icon: <RiDrinks2Line />,
    selectedIcon: <RiDrinks2Fill />,
  },
  {
    name: "Hot Drinks",
    icon: <RiDrinksLine />,
    selectedIcon: <RiDrinksFill />,
  },
  {
    name: "Hot Meal",
    icon: <GiHotMeal />,
    selectedIcon: <GiHotMeal />,
  },
  {
    name: "Cold Meal",
    icon: <TbSalad />,
    selectedIcon: <TbSalad />,
  },
];

const RestaurantMenu = () => {
  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCat, setSelectedCat] = useState([]);
  const { id } = useParams();
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/restaurants/menu/items?id=${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setMenuItems(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMenu();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSelect = () => {};

  return loading ? (
    <div className="w-full min-h-screen flex items-center justify-center flex-col m-auto">
      <OneEightyRingWithBg className="!text-primary" />
    </div>
  ) : (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-start">
        <Header title={"Menu Items"} handleBack={handleBack} />
        <div className="w-full p-4">
          <MenuSearcphBox menuItems={menuItems} />
          {categories.map((category, index) => {
            return <Chip key={index} label={category.name} />
          })}
          <section>
            <div className="w-full">
              <h1></h1>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default RestaurantMenu;
