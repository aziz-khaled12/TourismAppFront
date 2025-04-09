import React, { useCallback } from "react";
import { Chip } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { filters } from "./consts";
import { toggleFilter } from "../../redux/mapSlice";
import { useDispatch, useSelector } from "react-redux";

const MapFilters = ({ isVisible = true }) => {
  const dispatch = useDispatch();
  const { selectedFilters } = useSelector((state) => state.map);

  const handleSelect = useCallback(
    (filter) => {
      dispatch(toggleFilter(filter));
    },
    [dispatch]
  );

  const renderChip = (filter, index) => (
    <SwiperSlide key={index} style={{ width: "fit-content" }}>
      <Chip
        icon={
          selectedFilters.includes(filter.name)
            ? filter.selectedIcon
            : filter.icon
        }
        label={filter.name}
        sx={{
          border: "1px solid #dfdfdf",
          fontSize: "14px",
          padding: "4px 8px",
        }}
        onClick={() => handleSelect(filter.name)}
        className={`${
          selectedFilters.includes(filter.name)
            ? "!bg-green-700 !text-background transition-colors duration-100"
            : "!text-primary !bg-white transition-colors duration-100"
        } !shadow-md`}
      />
    </SwiperSlide>
  );

  if (!isVisible) return null;

  return (
    <div className="w-full">
      <Swiper spaceBetween={4} slidesPerView="auto">
        {filters.map((filter, index) => renderChip(filter, index))}
      </Swiper>
    </div>
  );
};

export default MapFilters;
