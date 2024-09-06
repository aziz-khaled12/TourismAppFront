import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchMenuItems } from "../../redux/restaurantsInterface/menuSlice";
import AddMenuItemModal from "./AddMenuItemModal";
import { useAuth } from "../../context/AuthContext";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { FaPlus } from "react-icons/fa";

const RestaurantMenu = ({ restaurant }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { menuItems } = useSelector((state) => state.menu);
  const { accessToken } = useAuth();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  console.log(restaurant);

  useEffect(() => {
    dispatch(fetchMenuItems({ restoId: restaurant.id, token: accessToken }));
  }, [restaurant]);

  useEffect(() => {
    console.log(menuItems);
  }, [menuItems]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleEditOpen = (room) => {
    setSelectedRoom(room); // Set the selected room data
    setOpenEdit(true);
  };

  const handleDeleteOpen = (room) => {
    setSelectedDeleteRoom(room); // Set the selected room data
    setOpenDelete(true);
  };

  const columns = [
    {
      field: "ID",
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
      field: "id",
      headerName: "item ID",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
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
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              onClick={() => handleEditOpen(params.row)}
            >
              <EditIcon className="text-primary" />
            </IconButton>
          </Tooltip>
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

  return (
    <>
      <div className="mb-6 w-full flex justify-between items-center ">
        <div className="font-[500] text-xl w-fit">Menu</div>
        <Button
          onClick={handleOpen}
          variant="contained"
          startIcon={<FaPlus className="!text-sm" />}
          className="!bg-primary !font-[600] !text-md"
        >
          {" "}
          Add new menu item
        </Button>
      </div>
      <Box
        sx={{
          height: 500,
          width: "100%",
        }}
      >
        <DataGrid
          sx={{
            '& .MuiDataGrid-scrollbar::-webkit-scrollbar': {
              width: '6px',
            },
            '& .MuiDataGrid-scrollbar::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '& .MuiDataGrid-scrollbar::-webkit-scrollbar-thumb': {
              backgroundColor: '#c4c4c4',
              borderRadius: "10px",
              border: "2px solid transparent"
            },
            '& .MuiDataGrid-scrollbar::-webkit-scrollbar-thumb:hover': {
              background: '#a1a1a1',
            },
          }}
          rows={menuItems}
          columns={columns}
          pageSize={5}
          disableColumnMenu
          rowHeight={70}
        />
      </Box>
      <AddMenuItemModal open={open} setOpen={setOpen} restaurant={restaurant} />
    </>
  );
};

export default RestaurantMenu;
