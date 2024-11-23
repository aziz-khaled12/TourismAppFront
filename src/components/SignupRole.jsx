import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { MdCloudUpload } from "react-icons/md";
import LocateControl from "./LocateControl ";
import { Typography, TextField, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const url = import.meta.env.VITE_LOCAL_BACK_END_URL;

const SignupRole = () => {
  const { role } = useParams();
  const [preview, setPreview] = useState();
  const [position, setPosition] = useState();
  const [workStart, setWorkStart] = useState(new Date());
  const [workEnd, setWorkEnd] = useState(new Date());
  const [matricule, setMatricule] = useState();
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();
  console.log(user);

  const [formData, setFormData] = useState({
    name: "",
    workStart: new Date(),
    workEnd: new Date(),
    description: "",
    location: { lat: 0, lon: 0 },
    country: "",
    state: "",
    city: "",
    road: "",
    image: "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
        localStorage.setItem("position", JSON.stringify(position));
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  useEffect(() => {
    console.log("Location updated:", formData.location);
  }, [formData.location]);

  const handleFileChange = (event) => {
    event.preventDefault();
    if (event.target.files) {
      setPreview(URL.createObjectURL(event.target.files[0]));
    }
    setFormData({ ...formData, image: event.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMapClick = async (e) => {
    const address = await getAddress(e.latlng.lat, e.latlng.lng);
    console.log("address: ", address)
    setFormData((prev) => ({
      ...prev,
      location: { lat: e.latlng.lat, lon: e.latlng.lng },
      country: address.country ? address.country : null,
      state: address.state ? address.state : null,
      city: address.city ? address.city : null,
      road: address.road ? address.road : null,
    }));
  };

  const getAddress = async (lat, lon) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    return data.address;
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  useEffect(() => {
    console.log(workStart);
  }, [workStart]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role === "Taxi") {
      try {
        const res = await axios.post(`${url}/add/${role.toLowerCase()}`, {
          matricule: matricule,
          user_id: user.id,
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      
      );
        if (res.status == 200) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const formattedStartTime = workStart.toISOString().substring(11, 19); // "11:30:15"
      const formattedEndTime = workEnd.toISOString().substring(11, 19); // "11:30:15"

      const form = new FormData();
      form.append("name", formData.name);
      form.append("workStart", formattedStartTime);
      form.append("workEnd", formattedEndTime);
      form.append("owner_id", user.id);
      form.append("description", formData.description);
      form.append("lat", formData.location.lat);
      form.append("lon", formData.location.lon);
      form.append("country", formData.country);
      form.append("state", formData.state);
      form.append("city", formData.city);
      form.append("road", formData.road);
      form.append("image", formData.image);

      try {
        const res = await axios.post(`${url}/add/${role.toLowerCase()}`, form, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.status == 200) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    position && (
      <>
        <div className="w-full min-h-screen flex items-center justify-center flex-col m-auto">
          <div className="w-full flex items-center justify-center">
            <div className="flex w-full items-center flex-col">
              <form
                className="w-[370px] bg-[#f9f9f9] p-6 rounded-3xl"
                onSubmit={handleSubmit}
              >
                <div className="mb-8">
                  <Typography variant="overline" display="block" gutterBottom>
                    LET'S GET YOU STARTED
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ textTransform: "uppercase" }}
                    gutterBottom
                  >
                    {role}
                  </Typography>
                </div>
                {role === "Taxi" ? (
                  <div className="w-full mb-4">
                    <TextField
                      className="w-full"
                      id="outlined-basic"
                      label="Matricule"
                      variant="outlined"
                      name="matricule"
                      value={matricule}
                      onChange={(e) => setMatricule(e.target.value)}
                    />
                  </div>
                ) : (
                  <>
                    <div className="w-full mb-4">
                      <TextField
                        className="w-full"
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full mb-4">
                      <TextField
                        className="w-full"
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex gap-4 mb-4">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div className="w-full flex flex-col gap-3">
                          <h1 className="font-medium text-base">Work Start</h1>
                          <TimePicker
                            fullWidth
                            placeholder="Work Start"
                            value={workStart}
                            onChange={(newValue) => setWorkStart(newValue)}
                            renderInput={(params) => (
                              <TextField
                                fullWidth
                                margin="normal"
                                {...params}
                              />
                            )}
                          />
                        </div>

                        <div className="w-full flex flex-col gap-3">
                          <h1 className="font-medium text-base">Work End</h1>
                          <TimePicker
                            fullWidth
                            placeholder="Work End"
                            value={workEnd}
                            onChange={(newValue) => setWorkEnd(newValue)}
                            renderInput={(params) => (
                              <TextField
                                fullWidth
                                margin="normal"
                                {...params}
                              />
                            )}
                          />
                        </div>
                      </LocalizationProvider>
                    </div>
                    <div className="w-full mb-4">
                      <h1 className="text-md font-medium mb-3">
                        Select Location
                      </h1>

                      <MapContainer
                        center={position}
                        zoom={13}
                        minZoom={5}
                        className="w-full h-[300px]"
                      >
                        <LocateControl position={position} />

                        <MapClickHandler />
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                          position={[
                            formData.location.lat,
                            formData.location.lon,
                          ]}
                        />
                      </MapContainer>
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
                  </>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  className="!bg-primary !rounded-lg !p-4 w-full !normal-case"
                >
                  GET STARTED
                </Button>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default SignupRole;
