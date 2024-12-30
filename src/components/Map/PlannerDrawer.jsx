import {
  Box,
  Button,
  InputAdornment,
  Stack,
  styled,
  SwipeableDrawer,
  TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { CiSearch } from "react-icons/ci";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { OneEightyRingWithBg } from "react-svg-spinners";
import LocationCard from "./LocationCard";
import { addLocation } from "../../redux/mapSlice";
import { useDispatch, useSelector } from "react-redux";

const url = import.meta.env.VITE_LOCAL_BACK_END_URL;

const Puller = styled("div")(({ theme }) => ({
  width: 40,
  height: 6,
  backgroundColor: grey[900],
  borderRadius: 3,
}));

const PlannerDrawer = ({ drawerOpen, setDrawerOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [planInput, setPlanInput] = useState("");
  const [plan, setPlan] = useState([]);

  const { accessToken } = useAuth();
  const dispatch = useDispatch();
  const position = useSelector((state) => state.map.userPosition);
  const handlePlanSubmit = useCallback(async () => {
    if (!planInput.trim()) return;

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${url}/planner`,
        {
          input: planInput,
          userLocation: {
            lat: position[0],
            lon: position[1],
          },
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setPlan(res.data.venues);
    } catch (error) {
      console.error("Planning error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [planInput, position, accessToken, url]);

  const showRoute = () => {
    const coordinates = plan.map((venue) => [venue.lat, venue.lon]);
    dispatch(addLocation(coordinates));
    setDrawerOpen(false);
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={drawerOpen}
      sx={{ height: "60vh" }}
      onClose={() => setDrawerOpen(false)}
      onOpen={() => setDrawerOpen(true)}
    >
      <Box
        pb={3}
        px={3}
        sx={{ height: "60vh", position: "relative", overflow: "auto" }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            zIndex: 1,
            paddingBottom: 1,
            display: "flex",
            justifyContent: "center",
            padding: "8px",
          }}
        >
          <Puller />
        </Box>

        <Box mt={2}>
          <Stack direction={"column"} spacing={4}>
            <Stack direction="column" spacing={2}>
              <TextField
                fullWidth
                placeholder="Tell us about your trip"
                onChange={(e) => setPlanInput(e.target.value)}
                multiline
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CiSearch className=" text-2xl" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "gray", // default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "gray", // border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "green", // border color when focused
                    },
                  },
                }}
              />
              <Button
                onClick={handlePlanSubmit}
                variant="contained"
                fullWidth
                className="!bg-green-700"
              >
                {isLoading ? (
                  <OneEightyRingWithBg color="white" />
                ) : (
                  "Discover your Trip"
                )}
              </Button>
            </Stack>
            {plan.length > 0 && (
              <>
                <Stack direction={"column"} spacing={2}>
                  {plan.map((venue, index) => {
                    return (
                      <LocationCard
                        key={index}
                        location={venue}
                        num={123}
                        fullWidth
                        height="40"
                        shadow
                      />
                    );
                  })}
                </Stack>

                <Button
                  variant="contained"
                  fullWidth
                  className="!bg-green-700"
                  onClick={showRoute}
                >
                  Show Route
                </Button>
              </>
            )}
          </Stack>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default PlannerDrawer;
