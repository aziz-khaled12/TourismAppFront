import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FaMinus, FaPlus } from "react-icons/fa";

const MenuItemCard = ({ menuItem }) => {

  console.log(menuItem)
  const [count, setCount] = useState(0);

  const increamentCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  useEffect(() => {
    console.log(menuItem);
  }, [menuItem]);
  return (
    <Box sx={{ borderRadius: 2 }} className={"!bg-lightBackground"}>
      <Stack spacing={0.5}>
        <Box>
          <img
            className="rounded-t-lg w-full min-h-[180px] h-auto"
            src={menuItem.image_url}
            alt="this is an image"
          />
        </Box>

        <Stack sx={{ padding: 2 }} spacing={1}>
          <div className="font-semibold text-xl">{menuItem.name}</div>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <div className="font-bold text-xl flex gap-2">{`${menuItem.price} DZD`}</div>

            <div className="flex items-center justify-around w-[100px]">
              <Button onClick={decrementCount} className="!p-0 !rounded-full !bg-white !h-[30px] !w-[30px] !min-w-0 custom-box-shadow">
                <FaMinus className="!text-black !text-sm" />
              </Button>
              <div className="text-xl font-bold">{count}</div>
              <Button onClick={increamentCount} className="!p-0 !rounded-full !bg-white !h-[30px] !w-[30px] !min-w-0 custom-box-shadow">
                <FaPlus className="!text-black !text-sm" />
              </Button>
            </div>

            {/* <Button
              startIcon={<FaPlus className="!text-lg" />}
              variant="contained"
            >
              Add
            </Button> */}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default MenuItemCard;
