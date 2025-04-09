import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  SwipeableDrawer,
  Button,
  Stack,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { MdClose, MdLocationOn } from "react-icons/md";
import TruncateMarkup from "react-truncate-markup";
import GeoSearch from "./GeoSearch";
import { addLocation } from "../../redux/mapSlice";
import { useDispatch } from "react-redux";

const CarBookingDrawer = ({ drawerOpen, setDrawerOpen }) => {
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [startSearchValue, setStartSearchValue] = useState("");
  const [endSearchValue, setEndSearchValue] = useState("");
  const [activeResults, setActiveResults] = useState([]);
  const [activeSearchField, setActiveSearchField] = useState(null);
  const dispatch = useDispatch();

  const handleLocationSelect = useCallback((type, location) => {
    console.log("Location selected:", type, location); // Add this debug log
    if (type === "start") {
      setStartLocation(location);
      setStartSearchValue(location.display_name);
    } else if (type === "end") {
      setEndLocation(location);
      setEndSearchValue(location.display_name);
    }
    setActiveResults([]);
    setActiveSearchField(null);
  }, []);

  const handleSearchFocus = useCallback((type) => {
    setActiveSearchField(type);
    setActiveResults([]);
  }, []);

  const handleResultsChange = useCallback((results) => {
    setActiveResults(results || []);
  }, []);

  const handleBooking = () => {
    const coordinates = [[startLocation.lat, startLocation.lon], [endLocation.lat, endLocation.lon]];
    dispatch(addLocation(coordinates));
    setDrawerOpen(false);
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      onOpen={() => setDrawerOpen(true)}
      sx={{ "& .MuiDrawer-paper": { overflow: "visible" } }}
    >
      <div className="shadow-lg relative flex flex-col justify-between h-screen overflow-auto">
        <Box>
          <Box p={3} className="shadow-lg mb-4">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={3}
            >
              <div className="text-2xl font-bold">Book a Ride</div>
              <MdClose
                className="!text-primary !text-xl cursor-pointer"
                onClick={() => setDrawerOpen(false)}
              />
            </Stack>

            <Stack direction="column" spacing={2}>
              <div className="space-y-2 relative">
                <div className="text-base font-medium">Start Location</div>
                <GeoSearch
                  value={startSearchValue}
                  onLocationSelect={(location) => {
                    console.log("Start location selected:", location); // Add this debug log
                    handleLocationSelect("start", location);
                  }}
                  onResultsChange={handleResultsChange}
                  onFocus={() => handleSearchFocus("start")}
                  inputProps={{ placeholder: "Enter Start Location" }}
                  currentLocation
                  showList={false}
                />
              </div>

              <div className="space-y-2">
                <div className="text-base font-medium">Destination</div>
                <GeoSearch
                  value={endSearchValue}
                  onLocationSelect={(location) => {
                    console.log("End location selected:", location); // Add this debug log
                    handleLocationSelect("end", location);
                  }}
                  onResultsChange={handleResultsChange}
                  onFocus={() => handleSearchFocus("end")}
                  inputProps={{ placeholder: "Enter Destination" }}
                  showList={false}
                />
              </div>
            </Stack>
          </Box>

          {activeResults.length > 0 && activeSearchField && (
            <Box px={2}>
              <List
                sx={{ width: "100%", bgcolor: "white" }}
                className="rounded-lg shadow-md"
              >
                {activeResults.map((result, index) => (
                  <React.Fragment key={result.place_id || index}>
                    <ListItemButton
                      onClick={() =>
                        handleLocationSelect(activeSearchField, result)
                      }
                    >
                      <ListItemIcon>
                        <MdLocationOn className="!text-xl text-gray-500" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <TruncateMarkup lines={2}>
                            <span className="!text-md">
                              {result.display_name}
                              {result.type && (
                                <span className="ml-2 text-sm text-gray-500">
                                  ({result.type})
                                </span>
                              )}
                            </span>
                          </TruncateMarkup>
                        }
                      />
                    </ListItemButton>
                    {index < activeResults.length - 1 && (
                      <Divider component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}
        </Box>

        <Box p={3} className="border-t">
          <Button
            variant="contained"
            fullWidth
            size="large"
            disabled={!startLocation || !endLocation}
            onClick={handleBooking}
            sx={{ py: 1.5 }}
          >
            {startLocation && endLocation
              ? "Confirm Booking"
              : "Select Locations"}
          </Button>
        </Box>
      </div>
    </SwipeableDrawer>
  );
};

export default CarBookingDrawer;
