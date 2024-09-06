import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { addMenuItem } from "../../redux/restaurantsInterface/menuSlice";

const AddMenuItemModal = ({ open, setOpen, restaurant }) => {
  const { accessToken } = useAuth();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.rooms);

  const [formData, setFormData] = useState({
    name: "",
    descr: "",
    price: 0,
    image: "",
    type: "",
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("descr", formData.descr);
    form.append("price", formData.price);
    form.append("image", formData.image);
    form.append("type", formData.type);

    try {
      const resultAction = await dispatch(
        addMenuItem({
          restoId: restaurant.id,
          itemData: form,
          accessToken: accessToken,
        })
      );

      if (addMenuItem.fulfilled.match(resultAction)) {
        console.log("Item added successfully:", resultAction.payload);
        handleClose(); // Close modal after successful submission
      } else {
        console.error("Failed to add item:", resultAction.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="w-[570px] rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl">
          <div className="text-2xl font-medium p-6 w-full border-b border-solid border-[#C4C4C4] mb-4">
            Add new Item
          </div>
          <form
            className="p-6 overflow-y-auto max-h-[540px] custom-scrollbar flex items-center flex-col"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-between items-start w-full mb-10">
              <h1 className="text-md font-medium">Item name</h1>
              <TextField
                className="w-[70%]"
                name="name"
                onChange={handleChange}
                label="Name"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="flex justify-between items-start w-full mb-10">
              <h1 className="text-md font-medium">Item description</h1>
              <TextField
                className="w-[70%]"
                name="descr"
                onChange={handleChange}
                label="Descreption"
                multiline
                rows={4}
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
              <h1 className="text-md font-medium">Type</h1>
              <FormControl sx={{width: "70%"}}>
                <InputLabel id="demo-simple-select-disabled-label"></InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  label="Type"
                  onChange={handleChange}
                >
                  <MenuItem value={"Hot drink"}>Hot drink</MenuItem>
                  <MenuItem value={"Cold drink"}>Cold drink</MenuItem>
                  <MenuItem value={"Hot meal"}>Hot meal</MenuItem>
                  <MenuItem value={"Cold meal"}>Cold meal</MenuItem>
                </Select>
              </FormControl>
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
              className="!bg-primary !rounded-lg !p-3 w-full !text-base"
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
                "Add Room"
              )}
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddMenuItemModal;
