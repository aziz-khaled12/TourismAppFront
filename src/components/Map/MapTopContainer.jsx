import React, { useState } from "react";
import MapFilters from "./MapFilters";
import MapSearch from "./MapSearch";
import { useDispatch } from "react-redux";
import { setDragging } from "../../redux/mapSlice";

const MapTopContainer = () => {
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch()

  return (
    <div
      className="z-1000 top-0 px-4 py-6 w-full fixed flex items-center justify-center gap-4 flex-col"
      onTouchStart={() => dispatch(setDragging(true))}
      onTouchEnd={() => dispatch(setDragging(false))}
    >
      <MapSearch
        onResultsChange={setSearchResults}
      />
      <MapFilters
        isVisible={searchResults.length === 0}
      />{" "}
    </div>
  );
};

export default MapTopContainer;
