import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { GetData } from "../../datafetch/users";
import AddRoomModal from "./AddRoomModal";
import DeleteRoomModal from "./DeleteRoomModal";
import EditRoomModal from "./EditRoomModal";
import { OneEightyRingWithBg } from "react-svg-spinners";

import axios from "axios";

const Rooms = () => {
  const url = import.meta.env.VITE_LOCAL_BACK_END_URL;
  const { accessToken, user } = useAuth();
  const [hotel, setHotel] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [rooms, setRooms] = useState(<OneEightyRingWithBg />);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDeleteRoom, setSelectedDeleteRoom] = useState(null);

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
      field: "capacity",
      headerName: "Capacity",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "number",
      headerName: "Room Number",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "Price (DZD)",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "image_url",
      headerName: "Image",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="h-full w-full flex items-center justify-center">
          <div className="w-[100px] h-[60px]">
            <img
              src={`${params.value}`}
              alt="Room"
              className="h-full w-full rounded-lg"
            />
          </div>
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center justify-center gap-2 w-full h-full">
          <IconButton
            aria-label="edit"
            onClick={() => handleEditOpen(params.row)}
          >
            <EditIcon className="text-primary" />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteOpen(params.row)}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      ),
      align: "center",
      headerAlign: "center",
    },
  ];

  const handleEditOpen = (room) => {
    setSelectedRoom(room); // Set the selected room data
    setOpenEdit(true);
  };

  const handleDeleteOpen = (room) => {
    setSelectedDeleteRoom(room); // Set the selected room data
    setOpenDelete(true);
  };

  useEffect(() => {
    GetData(user, setHotel, accessToken);
  }, []);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchHotelRooms = async () => {
      try {
        const result = await axios.get(`${url}/hotels/rooms/${hotel.id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (result.status == 200) {
          console.log(result.data);
          setRooms(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (hotel) {
      fetchHotelRooms();
    }
  }, [hotel]);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="mb-6 w-full flex justify-between items-center ">
        <div className="font-[500] text-xl w-fit">Rooms</div>
        <Button
          onClick={handleOpen}
          variant="contained"
          startIcon={<FaPlus className="!text-sm" />}
          className="!bg-primary !font-[600] !text-md"
        >
          {" "}
          Add new Room
        </Button>
      </div>
      <div style={{ height: 300, width: "100%" }}>
        <div className="w-full h-full min-h-[400px]">
          {rooms && (
            <DataGrid
              rows={rooms}
              columns={columns}
              pageSize={5}
              autoHeight
              disableColumnMenu
              rowHeight={70}
            />
          )}
        </div>
      </div>
      <AddRoomModal open={open} setOpen={setOpen} />
      {selectedRoom && (
        <EditRoomModal
          open={openEdit}
          setOpen={setOpenEdit}
          oldRoom={selectedRoom}
        />
      )}
      <DeleteRoomModal
        open={openDelete}
        setOpen={setOpenDelete}
        room={selectedDeleteRoom}
      />
    </>
  );
};

export default Rooms;
