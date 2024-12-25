import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  Stack,
  styled,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../../redux/hotelInterface/bookingSlice";
import { showAlert } from "../../redux/alertSlice";

const BookingDrawer = ({
  handleClose, 
  handleOpen,
  open,
  date,
  people,
  roomsNum,
  room,
}) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.bookings);
  const [bookingData, setBookingData] = useState([]);
  const { id } = useParams();
  const { user, accessToken } = useAuth();

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

  useEffect(() => {

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
    const booking_start = new Date(date[0].startDate)
      .toISOString()
      .replace("Z", "+02:00");
    const booking_end = new Date(date[0].endDate)
      .toISOString()
      .replace("Z", "+02:00");

    const bookingData = new FormData();
    bookingData.append("user_id", user.id);
    bookingData.append("hotel_id", id);
    bookingData.append("person_number", people);
    bookingData.append("room_id", room.id);
    bookingData.append("total_price", total_price);
    bookingData.append("booking_start", booking_start);
    bookingData.append("booking_end", booking_end);

    try {
      dispatch(
        addBooking({ bookingData: bookingData, accessToken: accessToken })
      );

     
    } catch (error) {
      handleClose();
      handleError();
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      handleClose(false)
      handleSuccess();
    } else if (status === "failed") {
      console.log("Booking failed");
      handleClose(false)
      handleError();
    }
  }, [status]);

  const handleSuccess = () => {
    dispatch(
      showAlert({ message: "Room Booked Successfuly", severity: "success" })
    );
  };

  const handleError = () => {
    dispatch(
      showAlert({ message: "Error Booking the Room", severity: "error" })
    );
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
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
