import { Button, Modal } from "@mui/material";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom } from "../../redux/hotelInterface/roomsSlice";
import { showAlert } from "../../redux/alertSlice";
import { OneEightyRingWithBg } from "react-svg-spinners";

const DeleteRoomModal = ({ open, setOpen, room, hotelId }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.rooms);
  const { accessToken } = useAuth();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    dispatch(
      showAlert({ message: "Room Deleted Successfuly", severity: "success" })
    );
  };

  const handleError = () => {
    dispatch(
      showAlert({ message: "Error Deleting the Room", severity: "error" })
    );
  };

  const handleDelete = () => {
    const queryParams = new URLSearchParams({
      capacity: room.capacity,
      number: room.number,
      price: room.price,
      oldImageUrl: room.image_url,
      hotel_id: hotelId,
    }).toString();

    dispatch(deleteRoom({ roomId: room.id, queryParams, accessToken }));

    if (status === "succeded") {
      handleClose();
      handleSuccess();
    } else if (status === "failed") {
      handleClose();
      handleError();
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="w-[570px] rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl">
          <div className="text-2xl font-semibold text-center p-6 w-full border-b border-solid border-[#C4C4C4]">
            Delete Room
          </div>
          <div className="w-full p-4 flex flex-col items-center justify-between">
            <h1 className="mb-5 font-medium text-base text-center">
              Confirming will permanently delete this room's data. Are you sure
              you want to proceed?
            </h1>
            <div className="w-full flex items-center justify-center gap-4">
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "transparent",
                  color: "#212121",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleDelete}
                color="error"
                className="!normal-case"
              >
                {status === "loading" ? (
                  <OneEightyRingWithBg className="!text-background" />
                ) : (
                  "Confirm"
                )}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteRoomModal;
