import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

const MenuItemCard = ({ menuItem }) => {
  useEffect(() => {
    console.log(menuItem);
  }, [menuItem]);
  return (
    <Box sx={{padding: 1, borderRadius: 2, boxShadow: "0px 0px 10px -4px black"}}>
      <Stack spacing={.5}>

        <Box>
          <img className="rounded-lg w-full h-auto" src={menuItem.image_url} alt="this is an image" />
        </Box>

        <Stack>
          <div className="font-semibold text-xl">{menuItem.name}</div>
          <div className="font-medium text-base">{menuItem.type}</div>
        </Stack>

        <div className="font-bold text-base flex gap-2">{`${menuItem.price} DZD`} <span className="text-red-600 font-medium">40% off</span></div>

      </Stack>
    </Box>
  );
};

export default MenuItemCard;
