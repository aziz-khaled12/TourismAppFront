import { InputAdornment, Popper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const MenuSearcphBox = ({ menuItems, filteredItems, setFilteredItems }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const filtered = menuItems
      .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        const queryLower = query.toLowerCase();
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        // Exact match comes first
        if (aName === queryLower) return -1;
        if (bName === queryLower) return 1;

        // Starts with the query comes second
        if (aName.startsWith(queryLower) && !bName.startsWith(queryLower))
          return -1;
        if (bName.startsWith(queryLower) && !aName.startsWith(queryLower))
          return 1;

        // Otherwise, sort alphabetically
        return aName.localeCompare(bName);
      });

    setFilteredItems(filtered);

    console.log(filteredItems);
  }, [query]);


  return (
    <TextField
      id="outlined-search"
      type="search"
      autoComplete="off"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      fullWidth
      className="!bg-gray-50 !relative"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <CiSearch className="text-4xl" />
          </InputAdornment>
        ),
      }}
      placeholder="Search for Something to Eat"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          "&.Mui-focused fieldset": {
            borderColor: "green",
          },
        },
      }}
    />
  );
};

export default MenuSearcphBox;
