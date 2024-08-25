import { Button, Modal } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const DeleteRoomModal = ({ open, setOpen, room, hotelId }) => {
  const url = import.meta.env.VITE_LOCAL_BACK_END_URL;

  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();

  const handleClose = () => {
    setOpen(false);
  };

  
  const handleDelete = async () => {
    const queryParams = new URLSearchParams({
      capacity: room.capacity,
      number: room.number,
      price: room.price,
      oldImageUrl: room.image_url,
      hotel_id: hotelId,
    });
  
    try {
      setLoading(true);
      const response = await fetch(`${url}/hotels/room/${room.id}?${queryParams}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        console.log("Room Deleted:", data);
        handleClose();
      } else {
        console.error("Failed to delete room:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="w-[570px] rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl">
          <div className="text-2xl font-semibold  p-6 w-full border-b border-solid border-[#C4C4C4]">
            Delete Room
          </div>
          <div className="w-full p-4 flex flex-col items-center justify-between">
            <h1 className="mb-4 font-medium text-lg">
              Confirming will permanently delete this room's data. Are you sure
              you want to proceed?
            </h1>
            <div
              className="w-full flex items-center justify-end gap-4"
              onClick={handleDelete}
            >
              <Button
                variant="contained"
                color="error"
                className="!normal-case"
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                className="!bg-primary"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteRoomModal;
