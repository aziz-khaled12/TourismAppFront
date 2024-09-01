import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  styled,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../redux/hotelInterface/bookingSlice";
const url = import.meta.env.VITE_LOCAL_BACK_END_URL;

const BookingDrawer = ({
  toggleDrawer,
  open,
  date,
  people,
  roomsNum,
  room,
}) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.bookings);

  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    console.log("drawer: ", date.startDate);
  }, [date]);

  const Puller = styled("div")(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
  }));
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

  const differenceInTime =
    date[0].endDate.getTime() - date[0].startDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
  const [total_price, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(differenceInDays * room.price);
  }, [differenceInTime, differenceInDays]);

  console.log(differenceInDays);

  const { id } = useParams();
  const { user, accessToken } = useAuth();

  useEffect(() => {
    console.log(total_price);
  }, [total_price]);

  useEffect(() => {
    console.log(date);

    setBookingData([
      {
        title: "Room",
        value: room.name,
      },
      {
        title: "Number of Persons",
        value: people,
      },
      {
        title: "Arrive Date",
        value: `${date[0].startDate.getDate()} ${
          monthNames[date[0].startDate.getMonth()]
        } ${date[0].startDate.getFullYear()}`,
      },
      {
        title: "Leaving Date",
        value: `${date[0].endDate.getDate()} ${
          monthNames[date[0].endDate.getMonth()]
        } ${date[0].endDate.getFullYear()}`,
      },
      {
        title: "Total Price",
        value: total_price,
      },
    ]);
  }, [date, people, room, total_price]);

  const handleSubmit = async () => {
    try {
      const bookingData = new FormData();
      bookingData.append("user_id", user.id);
      bookingData.append("hotel_id", id);
      bookingData.append("person_number", people);
      bookingData.append("room_id", room.id);
      bookingData.append("total_price", total_price);
      bookingData.append("booking_start", date[0].startDate);
      bookingData.append("booking_end", date[0].endDate);

      dispatch(
        addBooking({ bookingData: bookingData, accessToken: accessToken })
      );

      if (status === "succeeded") {
        toggleDrawer(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
              Booking
            </div>
          </div>
        </div>

        <Stack spacing={4} sx={{ width: "100%", padding: "16px" }}>
          <Stack direction={"column"} spacing={4}>
            {bookingData.map((data, index) => {
              return (
                <Stack direction={"column"} spacing={1} key={index}>
                  <Typography sx={{ fontWeight: "600", fontSize: "22px" }}>
                    {data.title}
                  </Typography>
                  <TextField
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button sx={{ color: "#15803d" }}>Edit</Button>
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                    sx={{ width: "100%" }}
                    value={
                      data.title == "Total Price"
                        ? `${data.value} DZD`
                        : data.value
                    }
                  ></TextField>
                </Stack>
              );
            })}
          </Stack>

          <Stack sx={{ width: "100%" }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                borderRadius: "6px",
                padding: "10px",
                fontSize: "18px",
                fontWeight: "500",
                textTransform: "none",
                backgroundColor: "#15803d",
                "&:hover": {
                  backgroundColor: "#15803d",
                },
                "&:active": {
                  backgroundColor: "#15803d",
                },
              }}
            >
              Confirm
            </Button>
          </Stack>
        </Stack>

        <Puller />
      </div>
    </SwipeableDrawer>
  );
};

export default BookingDrawer;
