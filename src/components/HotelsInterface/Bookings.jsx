import { Button, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../redux/hotelInterface/bookingSlice";
import { format } from "date-fns";
import DeleteBookingModal from "./DeleteBookingModal";

const Bookings = ({ hotel }) => {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookings);
  const { accessToken } = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedDeleteBooking, setSelectedDeleteBooking] = useState(null);
  const [error, setError] = useState(null);

  const columns = [
    {
      field: "id",
      headerName: "#",
      width: 70,
      renderCell: (params) => (
        <div className="h-full w-full flex items-center justify-center">
          {params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1}
        </div>
      ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "person_number",
      headerName: "Number of persons",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "room_id",
      headerName: "Room ID",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "total_price",
      headerName: "Price (DZD)",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "booking_start",
      headerName: "Arrive Date",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const date = new Date(params.value);
        return format(date, "MM/dd/yyyy");
      },
    },
    {
      field: "booking_end",
      headerName: "Leaving Date",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const date = new Date(params.value);
        return format(date, "MM/dd/yyyy");
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center justify-center gap-2 w-full h-full">
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={() => handleDeleteOpen(params.row)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </div>
      ),
      align: "center",
      headerAlign: "center",
    },
  ];

  const fetchBookingsData = useCallback(async () => {
    try {
      await GetBookings(accessToken, hotel.id, setBookings);
    } catch (err) {
      setError(err.message);
    }
  }, [accessToken, hotel]);

  useEffect(() => {
    fetchBookingsData();
  }, [hotel, fetchBookingsData]);

  const handleDeleteOpen = (booking) => {
    setSelectedDeleteBooking(booking); // Set the selected room data
    setOpen(true);
  };

  useEffect(() => {
    dispatch(fetchBookings({ hotelId: hotel.id, accessToken: accessToken }));
  }, [hotel]);

  return (
    <>
      <div className="font-medium mb-6 text-xl w-fit">Bookings</div>

      <div className="h-[300px] w-full">
        <div className="w-full h-full min-h-[400px]">
          <DataGrid
            rows={bookings}
            columns={columns}
            pageSize={5}
            autoHeight
            disableColumnMenu
            rowHeight={70}
          />
          {selectedDeleteBooking && (
            <DeleteBookingModal
              open={open}
              setOpen={setOpen}
              booking={selectedDeleteBooking}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Bookings;
