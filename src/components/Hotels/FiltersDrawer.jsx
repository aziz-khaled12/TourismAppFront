import React, { useState } from "react";
import { Button, styled, SwipeableDrawer } from "@mui/material";
import { IoBedOutline, IoCalendarNumberOutline } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { FaMinus, FaPlus } from "react-icons/fa";
import { grey } from "@mui/material/colors";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file


const FiltersDrawer = ({ confirmDetails, applyDate, toggleDrawer, roomsNum, people, open, selectedOption, setSelectedOption }) => {
  const [preRooms, setPreRooms] = useState(roomsNum);
  const [prePeople, setPrePeople] = useState(people);
  const [preDate, setPreDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const Puller = styled("div")(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
  }));
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const incrementRooms = () => {
    setPreRooms(preRooms + 1);
  };

  const toggleOption = (option) => {
    setSelectedOption(option);
  };

  const decrementRooms = () => {
    if (preRooms > 1) {
      setPreRooms(preRooms - 1);
    }
  };

  const incrementPeople = () => {
    setPrePeople(prePeople + 1);
  };

  const decrementPeople = () => {
    if (prePeople > 1) {
      setPrePeople(prePeople - 1);
    }
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <div className="w-[full] h-[90vh] relative flex flex-col items-center justify-start">
        <div className="w-full mt-10 border-[#6e6e6e] border-b border-solid">
          <div className="w-full flex justify-between p-4 mb-3">
            <div className="flex items-center font-[600] text-2xl ">
              Details
            </div>
          </div>
        </div>

        <div className="w-full flex px-4 flex-col items-center justify-start">
          <div
            className={`w-full py-8  ${
              selectedOption == 3 ? "hidden" : "block"
            } flex`}
          >
            <Button
              onClick={() => {
                toggleOption(1);
              }}
              startIcon={
                <IoCalendarNumberOutline className="!text-xl !flex !items-center" />
              }
              className={`!max-w-[210px] !min-w-[200px] !rounded-full !font-medium !px-4 !py-3 !text-sm !flex !items-center !normal-case ${
                selectedOption == 1
                  ? "!text-white !bg-green-700"
                  : "!text-black !bg-transparent"
              } !border !border-[#9e9e9e] !border-solid !mr-2`}
            >
              {preDate[0].startDate.getDate()}{" "}
              {monthNames[preDate[0].startDate.getMonth()]}
              <MdArrowRightAlt className="!text-3xl mx-1" />{" "}
              {preDate[0].endDate.getDate()}{" "}
              {monthNames[preDate[0].endDate.getMonth()]}
            </Button>
            <Button
              onClick={() => {
                toggleOption(2);
              }}
              className={`!rounded-full !font-medium !px-4 !py-3 !min-w-[140px] !text-sm !normal-case ${
                selectedOption == 2
                  ? "!text-white !bg-green-700"
                  : "!text-black !bg-transparent"
              } items-baseline !border !border-[#9e9e9e] !border-solid !mr-2`}
              sx={{ textTransform: "none" }}
            >
              <span className="flex mr-3 items-center justify-end">
                <IoBedOutline className="!text-xl !flex !items-center !mr-2" />{" "}
                {preRooms}
              </span>
              <span className="flex items-center justify-end">
                <GoPeople className="!text-xl !flex !items-center !ml-2 mr-2" />{" "}
                {prePeople}
              </span>
            </Button>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            {selectedOption == 1 ? (
              <div className="w-full flex flex-col justify-between items-center h-[60vh]">
                <DateRange
                  className="bg-[#eff2f7]  rounded-lg"
                  editableDateInputs={true}
                  showSelectionPreview={true}
                  onChange={(item) => setPreDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={preDate}
                />
                <Button
                  onClick={() => {
                    applyDate(preDate);
                  }}
                  variant="contained"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "medium",
                    backgroundColor: "#15803d",
                    textTransform: "none",
                    borderRadius: "99px",
                    padding: "16px 20px",
                  }}
                >
                  Apply Changes
                </Button>
              </div>
            ) : selectedOption == 2 ? (
              <>
                <div className="w-full flex flex-col justify-between items-center h-[60vh]">
                  <div className="w-full">
                    <div className="w-full mt-1">
                      <div className="p-6 rounded-xl flex items-center justify-between bg-green-50">
                        <div className="font-bold text-xl">Room</div>
                        <div className="flex items-center justify-around w-[200px]">
                          <Button
                            onClick={decrementRooms}
                            className="!p-0 !rounded-full !bg-white !h-[45px] !w-[45px] !min-w-0 custom-box-shadow"
                          >
                            <FaMinus className="!text-black !text-md" />
                          </Button>
                          <div className="text-2xl font-bold">{preRooms}</div>
                          <Button
                            onClick={incrementRooms}
                            className="!p-0 !rounded-full !bg-white !h-[45px] !w-[45px] !min-w-0 custom-box-shadow"
                          >
                            <FaPlus className="!text-black !text-md" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="w-full mt-6 rounded-xl bg-green-50 ">
                      <div className="p-6  flex items-center justify-between border-b-2 border-solid border-white ">
                        <div className="font-bold text-xl">People</div>
                        <div className="flex items-center justify-around w-[200px]">
                          <Button
                            onClick={decrementPeople}
                            className="!p-0 !rounded-full !bg-white !h-[45px] !w-[45px] !min-w-0 custom-box-shadow"
                          >
                            <FaMinus className="!text-black !text-md" />
                          </Button>
                          <div className="text-2xl font-bold">{prePeople}</div>
                          <Button
                            onClick={incrementPeople}
                            className="!p-0 !rounded-full !bg-white !h-[45px] !w-[45px] !min-w-0 custom-box-shadow"
                          >
                            <FaPlus className="!text-black !text-md" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      confirmDetails(prePeople, preRooms);
                    }}
                    variant="contained"
                    sx={{
                      fontSize: "16px",
                      fontWeight: "medium",
                      backgroundColor: "#15803d",
                      textTransform: "none",
                      borderRadius: "99px",
                      padding: "16px 20px",
                    }}
                  >
                    Apply Changes
                  </Button>
                </div>
              </>
            ) : (
              "nothing"
            )}
          </div>
        </div>

        <Puller />
      </div>
    </SwipeableDrawer>
  );
};

export default FiltersDrawer;
