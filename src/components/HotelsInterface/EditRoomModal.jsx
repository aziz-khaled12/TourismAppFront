import { Button, InputAdornment, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { OneEightyRingWithBg } from "react-svg-spinners";
import { useDispatch, useSelector } from 'react-redux';
import { modifyRoom } from '../../redux/hotelInterface/roomsSlice';
import { useAuth } from "../../context/AuthContext";



const EditRoomModal = ({ open, setOpen, oldRoom, hotel }) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.rooms);
  const {accessToken} = useAuth()
  const [formData, setFormData] = useState({
    capacity: oldRoom.capacity,
    number: oldRoom.number,
    price: oldRoom.price,
    hotel_id: "",
    image_url: oldRoom.image_url,
  });

  const [preview, setPreview] = useState(oldRoom.image_url);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append("capacity", formData.capacity);
    form.append("number", formData.number);
    form.append("price", formData.price);
    form.append("image", formData.image);
    form.append("oldImageUrl", oldRoom.image_url);
    form.append("hotel_id", hotel.id);

    await dispatch(modifyRoom({ roomId: oldRoom.id, roomData: form, accessToken: accessToken }));
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="w-[570px] rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl">
          <div className="text-2xl font-medium p-6 w-full border-b border-solid border-[#C4C4C4] mb-4">
            Edit Room
          </div>
          <form
            className="p-6 overflow-y-auto max-h-[540px] custom-scrollbar flex items-center flex-col"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-between items-start w-full mb-10">
              <h1 className="text-md font-medium">Room capacity</h1>
              <TextField
                className="w-[70%]"
                name="capacity"
                onChange={handleChange}
                placeholder={String(oldRoom.capacity)}
                label="Capacity"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="flex justify-between items-start w-full mb-10">
              <h1 className="text-md font-medium">Number of Rooms</h1>
              <TextField
                className="w-[70%]"
                name="number"
                onChange={handleChange}
                placeholder={String(oldRoom.number)}
                label="Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="flex justify-between items-start w-full mb-10">
              <h1 className="text-md font-medium">Price</h1>
              <TextField
                className="w-[70%]"
                name="price"
                placeholder={String(oldRoom.price)}
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
            <div className="flex justify-between items-start w-full mb-10">
              <h1 className="text-md font-medium">Image</h1>
              <div
                className={`${
                  preview ? "w-[70%] h-fit" : "w-[70%] h-[200px]"
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
            </div>
            <Button
              type="submit"
              variant="contained"
              disabled={status === "loading"}
              className="!bg-primary !rounded-lg !p-3 w-full !text-base"
            >
               {status === "loading" ? <OneEightyRingWithBg color="#74767e" /> : "Edit Room"}
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EditRoomModal;
