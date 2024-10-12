import { Button, InputAdornment, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addRoom } from "../../redux/hotelInterface/roomsSlice.js";
import { useAuth } from "../../context/AuthContext";
import { showAlert } from "../../redux/alertSlice";
import { OneEightyRingWithBg } from "react-svg-spinners";

const AddRoomModal = ({ open, setOpen, hotel }) => {
  const { accessToken } = useAuth();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.rooms);

  const [formData, setFormData] = useState({
    single_beds: 0,
    double_beds: 0,
    number: 0,
    price: 0,
    hotel_id: "",
    image: "",
    name: "",
  });
  const [preview, setPreview] = useState();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    if (event.target.files) {
      setPreview(URL.createObjectURL(event.target.files[0]));
    }
    setFormData({ ...formData, image: event.target.files[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = new FormData();

    const capacity =
      Number(formData.double_beds) * 2 + Number(formData.single_beds);

    form.append("capacity", capacity);
    form.append("number", formData.number);
    form.append("single_beds", formData.single_beds);
    form.append("double_beds", formData.double_beds);
    form.append("price", formData.price);
    form.append("image", formData.image);
    form.append("hotel_id", hotel.id);
    form.append("name", formData.name);

    try {
      dispatch(addRoom({ roomData: form, accessToken: accessToken }));

      if (status === "succeded") {
        handleClose();
        handleSuccess();
      } else if (status === "failed") {
        handleClose();
        handleError();
      }
    } catch (error) {
      handleClose();
      handleError();
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    dispatch(
      showAlert({ message: "Room Added Successfuly", severity: "success" })
    );
  };

  const handleError = () => {
    dispatch(
      showAlert({ message: "Error Adding the Room", severity: "error" })
    );
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="w-[570px] rounded-2xl absolute top-1/2 left-1/2 transform py-6 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl">
          <div className="text-2xl pl-8 pb-4 font-semibold  w-full ">
            Add new Room
          </div>
          <form
            className="  flex items-center flex-col"
            onSubmit={handleSubmit}
          >
            <div className="w-full p-10 overflow-y-auto max-h-[540px] custom-scrollbar flex items-center gap-5 flex-col mb-5">
              <div className="flex flex-col items-start w-full">
                <h1 className="text-md font-medium mb-3">Name</h1>
                <TextField
                  className="w-full"
                  name="name"
                  onChange={handleChange}
                  label="Room Name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="w-full flex justify-between gap-[20px]">
                <div className="flex flex-col justify-between items-start w-full">
                  <h1 className="text-md font-medium mb-3">Single Beds</h1>
                  <TextField
                    name="single_beds"
                    onChange={handleChange}
                    label="Single Beds"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>

                <div className="flex flex-col justify-between items-start w-full">
                  <h1 className="text-md font-medium mb-3">Double Beds</h1>
                  <TextField
                    name="double_beds"
                    onChange={handleChange}
                    label="Double Beds"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </div>
              <div className="w-full flex justify-between gap-[20px]">
                <div className="flex flex-col justify-between items-start w-full">
                  <h1 className="text-md font-medium mb-3">Price</h1>
                  <TextField
                    className="w-full"
                    name="price"
                    onChange={handleChange}
                    label="Price"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">DZD</InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>

                <div className="flex flex-col justify-between items-start w-full">
                  <h1 className="text-md font-medium mb-3">Available Rooms</h1>
                  <TextField
                    name="available"
                    onChange={handleChange}
                    label="Available Rooms"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between shadowlg items-start w-full mb-5">
                <h1 className="text-md font-medium mb-3">Image</h1>
                <div
                  className={`${
                    preview ? "w-full h-fit" : "w-full h-[300px]"
                  }  p-1 duration-200 flex items-center justify-center cursor-pointer border-dashed border-2 border-[#cacaca]`}
                  onClick={() => {
                    document.querySelector("#image-input").click();
                  }}
                >
                  <input
                    id="image-input"
                    accept="image/*"
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {preview ? (
                    <img className="w-full h-auto" src={preview} alt="" />
                  ) : (
                    <MdCloudUpload className="text-3xl" />
                  )}
                </div>
              </div>{" "}
              <Button
                type="submit"
                variant="contained"
                className="!bg-primary !rounded-lg !p-3 !text-base w-[90%]"
              >
                {status === "loading" ? (
                    <OneEightyRingWithBg className="!text-background" />
                ) : (
                  "Add Room"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddRoomModal;
