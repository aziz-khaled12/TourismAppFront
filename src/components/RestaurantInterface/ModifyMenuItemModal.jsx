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
import React, { useEffect, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { modifyMenuItem } from "../../redux/restaurantsInterface/menuSlice";
import { showAlert } from "../../redux/alertSlice";
import { OneEightyRingWithBg } from "react-svg-spinners";

const ModifyMenuItemModal = ({ open, setOpen, item, restaurantName }) => {
  const { accessToken } = useAuth();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.menu);

  const [formData, setFormData] = useState({
    name: item.name,
    descr: item.descr,
    price: item.price,
    image: "",
    type: item.type,
  });

  useEffect(() => {
    setFormData({
      name: item.name,
      descr: item.descr,
      price: item.price,
      image: "",
      type: item.type,
    });
    setPreview(item.image_url[0]);
  }, [item]);
  const [preview, setPreview] = useState(item.image_url[0]);

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("descr", formData.descr);
    form.append("price", formData.price);
    form.append("image", formData.image);
    form.append("oldImageUrl", item.image_url[0]);
    form.append("restaurantName", restaurantName);
    form.append("type", formData.type);

    try {
      const resultAction = await dispatch(
        modifyMenuItem({
          itemId: item.id,
          itemData: form,
          accessToken: accessToken,
        })
      );

      if (status === "succeeded") {
        handleClose();
        handleSuccess()
        console.log("Item modified successfully:", resultAction.payload);
      } else if (status === "failed") {
        handleError()
        console.error("Failed to add item:", resultAction.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSuccess = () => {
    dispatch(showAlert({ message: 'Item Modified', severity: 'success' }));
  };

  const handleError = () => {
    dispatch(showAlert({ message: 'Error Modifying the Item', severity: 'error' }));
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="w-[570px] rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl">
          <div className="text-2xl font-medium p-6 w-full border-b border-solid border-[#C4C4C4] mb-4">
            Add new Item
          </div>
          <form className="flex items-center flex-col" onSubmit={handleSubmit}>
            <div className="w-full p-10 overflow-y-auto max-h-[540px] custom-scrollbar flex items-center gap-5 flex-col gap-5">
              <div className="flex items-center gap-5">
                <div className=" w-full">
                  <h1 className="text-md mb-3 font-medium">Name</h1>
                  <TextField
                    className="w-full"
                    name="name"
                    placeholder={item.name}
                    onChange={handleChange}
                    label="Name"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className="w-full">
                  <h1 className="text-md mb-3 font-medium">Price</h1>
                  <TextField
                    className="w-full"
                    name="price"
                    placeholder={item.price}
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
              </div>

              <div className="w-full">
                <h1 className="text-md mb-3 font-medium">Description</h1>
                <TextField
                  className="w-full"
                  name="descr"
                  placeholder={item.descr}
                  onChange={handleChange}
                  label="Descreption"
                  multiline
                  rows={4}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>

              <div className="w-full">
                <h1 className="text-md mb-3 font-medium">Type</h1>
                <FormControl className="w-full">
                  <InputLabel>Type</InputLabel>
                  <Select
                    className="w-full"
                    name="type"
                    placeholder={item.type}
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
              </div>
              <Button
                type="submit"
                variant="contained"
                className="!bg-primary !rounded-lg !p-3 w-full !text-base"
              >
                {status === "loading" ? (
                                   <OneEightyRingWithBg className="!text-background" />

                ) : (
                  "Modify Item"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModifyMenuItemModal;
