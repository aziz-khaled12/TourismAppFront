import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  Autocomplete,
  Box,
  Chip,
  Grid,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
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
import MenuItemCard from "./MenuItemCard";

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
  const [filteredItems, setFilteredItems] = useState([]);
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
        console.log(res.data);
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

  const handleSelect = (category) => {
    let newSelected;
    if (selectedCat.includes(category)) {
      newSelected = selectedCat.filter((i) => i !== category);
    } else {
      newSelected = [...selectedCat, category];
    }

    setSelectedCat(newSelected);
  };

  return loading ? (
    <div className="w-full min-h-screen flex items-center justify-center flex-col m-auto">
      <OneEightyRingWithBg className="!text-primary" />
    </div>
  ) : (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-start">
        <Header title={"Menu Items"} handleBack={handleBack} />
        <div className="w-full p-4">
          <MenuSearcphBox
            menuItems={menuItems}
            filteredItems={filteredItems}
            setFilteredItems={setFilteredItems}
          />
          <div className="w-full flex items-center gap-1 p-4">
            {categories.map((category, index) => {
              return (
                <Chip
                  key={index}
                  label={category.name}
                  onClick={() => {
                    handleSelect(category.name);
                  }}
                  className={
                    selectedCat.includes(category.name)
                      ? `!bg-green-700 !text-background transition-colors duration-100`
                      : "!text-primary transition-colors duration-100"
                  }
                />
              );
            })}
          </div>
          <section>
            <div className="w-full">
              <Box sx={{ flexGrow: 1 }}>
                {menuItems.length > 0 && filteredItems.length === 0 ? (
                  <Grid container spacing={2}>
                    {menuItems.map((item, index) => {
                      return (
                        <Grid key={index} item xs={12}>
                          <MenuItemCard menuItem={item} />
                        </Grid>
                      );
                    })}
                  </Grid>
                ) : (
                  <Grid container spacing={2}>
                    {filteredItems.map((item, index) => {
                      return (
                        <Grid key={index} item xs={12}>
                          <MenuItemCard menuItem={item} />
                        </Grid>
                      );
                    })}
                  </Grid>
                )}
              </Box>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default RestaurantMenu;
