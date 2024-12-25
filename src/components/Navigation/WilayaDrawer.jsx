import {
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  SwipeableDrawer,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import WilayaSearchBox from "./WilayaSearchBox";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setWilaya } from "../../redux/selectedTabSlice";
import axios from "axios";

const WilayaDrawer = ({ open, handleOpen, handleClose }) => {
  const dispatch = useDispatch();
  const [position, setPosition] = useState([]); // Default position
  const wilaya = useSelector((state) => state.selectedTab.wilaya);

  const popularLocations = [
    { name: "Tipaza" },
    { name: "Alger" },
    { name: "Constantine" },
    { name: "Oran" },
    { name: "Annaba" },
  ];

  const Puller = styled("div")(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
  }));

  const handleResultClick = (wilaya) => {
    console.log("selected wilaya: ", wilaya);
    dispatch(setWilaya(wilaya));
    handleClose();
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
        console.log("position: ", position);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  const handleMyLocation = async () => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&format=json`
      );
      handleResultClick(res.data.address.state);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="bg-green-700 shadow-xl text-base text-white w-full px-2 py-3 rounded-full"
        onClick={handleOpen}
      >
        Selected Wilaya: <span className="font-semibold">{wilaya}</span>
      </button>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
      >
        <div className="w-[full] h-[90vh] relative flex flex-col items-center justify-start">
          <div className="w-full mt-10 border-[#6e6e6e] border-b border-solid">
            <div className="w-full flex justify-between p-4 mb-3">
              <div className="flex items-center font-[600] text-2xl ">
                Select Wilaya
              </div>
            </div>
          </div>

          <Stack spacing={4} sx={{ width: "100%", padding: "16px" }}>
            <WilayaSearchBox handleResultClick={handleResultClick} />
            <div className="w-full mt-8">
              <div className="text-sm mb-5 font-medium">
                Popular destinations
              </div>
              <List
                sx={{ width: "100%" }}
                className="!mt-2 rounded-lg !w-full !bg-lightBackground"
              >
                {popularLocations.map((location, index) => {
                  return (
                    <ListItemButton
                      key={index}
                      className={`!border-white !border-solid p-4 ${
                        index !== popularLocations.length - 1
                          ? "!border-b-2"
                          : ""
                      }`}
                      onClick={() => {
                        handleResultClick(location.name);
                      }}
                    >
                      <ListItemIcon className="!text-black !opacity-60">
                        <HiOutlineLocationMarker className="text-3xl" />
                      </ListItemIcon>
                      <ListItemText
                        className="!py-2 "
                        primary={
                          <span className="text-base font-medium">
                            {location.name}
                          </span>
                        }
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </div>
            <Stack sx={{ width: "100%" }}>
              <Button
                variant="contained"
                onClick={handleMyLocation}
                sx={{
                  borderRadius: "6px",
                  padding: "10px",
                  fontSize: "16px",
                  fontWeight: "500",
                  textTransform: "none",
                  backgroundColor: "#15803d",
                  "&:hover": {
                    backgroundColor: "#15803d",
                  },
                  "&:active": {
                    backgroundColor: "#15803d",
                  },
                }}
              >
                Use Current Location
              </Button>
            </Stack>
          </Stack>

          <Puller />
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default WilayaDrawer;
