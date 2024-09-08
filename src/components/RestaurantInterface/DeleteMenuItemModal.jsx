import { Button, Modal } from "@mui/material";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { deleteMenuItem } from "../../redux/restaurantsInterface/menuSlice";
import { showAlert } from "../../redux/alertSlice";

const DeleteMenuItemModal = ({ open, setOpen, item, restaurantId }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.menu);
  const { accessToken } = useAuth();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const queryParams = new URLSearchParams({
      itemId: item.id,
      type: item.type,
      name: item.name,
      price: item.price,
      imageURL: item.image_url,
      restaurantId: restaurantId,
    }).toString();

    dispatch(deleteMenuItem({ queryParams, accessToken }));

    if (status === "succeeded") {
      handleClose();
      handleSuccess()
    }else if(status === "failed") {
      handleClose();
      handleError()
    }
  };


  const handleSuccess = () => {
    dispatch(showAlert({ message: 'Item Deleted', severity: 'success' }));
  };

  const handleError = () => {
    dispatch(showAlert({ message: 'Error Deleting the Item', severity: 'error' }));
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="w-[570px] rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl">
          <div className="text-2xl font-semibold text-center p-6 w-full border-b border-solid border-[#C4C4C4]">
            Delete Item
          </div>
          <div className="w-full p-4 flex flex-col items-center justify-between">
            <h1 className="mb-5 font-medium text-base text-center">
              Confirming will permanently delete this item's data. Are you sure
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
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <style>{`.spinner_z9k8{color: white;transform-origin:center;animation:spinner_StKS .75s infinite linear}@keyframes spinner_StKS{100%{transform:rotate(360deg)}}`}</style>
                    <path
                      d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                      opacity=".25"
                    />
                    <path
                      d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                      className="spinner_z9k8"
                    />
                  </svg>
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

export default DeleteMenuItemModal;
