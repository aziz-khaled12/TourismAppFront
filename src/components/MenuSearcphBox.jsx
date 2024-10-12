import { Autocomplete, InputAdornment, Popper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const MenuSearcphBox = ({ menuItems }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (query.length >= 2) {
      const filtered = menuItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]); // Clear the filtered list if input is less than 2 characters
    }
  }, [query]);

  const CustomPopper = (props) => {
    return <Popper {...props} className="!top-[10px]" />;
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={filteredItems.map((item) => item.name)}
      noOptionsText={"work nigga"}
      onInputChange={(event, newInputValue) => {
        setQuery(newInputValue);
      }}
     
      PopperComponent={CustomPopper}
      renderInput={(params) => (
        <TextField
          {...params}
          id="outlined-search"
          type="search"
          autoComplete="off"
          fullWidth
          className="!bg-gray-50 !relative"
          InputProps={{
            ...params.InputProps,
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
      )}
    />
  );
};

export default MenuSearcphBox;
