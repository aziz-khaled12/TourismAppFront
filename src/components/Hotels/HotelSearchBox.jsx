import React, { useEffect, useRef, useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  InputAdornment,
  TextField,
} from "@mui/material";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { GetWilayas } from "../../datafetch/hotels";
import { useAuth } from "../../context/AuthContext";
import { styled } from "@mui/material/styles";
import { CiSearch } from "react-icons/ci";

const HotelSearchBox = () => {
  const [query, setQuery] = useState("");
  const [wilayas, setWilayas] = useState();
  const [results, setResults] = useState([]);
  const debounceTimeoutRef = useRef(null);
  const { accessToken } = useAuth();
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchWilayas = async () => {
      await GetWilayas(setWilayas, accessToken);
    };
    fetchWilayas();
  }, [accessToken]);

  useEffect(() => {
    if (wilayas) {
      const handleSearch = () => {
        if (query.trim() === "") {
          setResults([]);
          return;
        }
        const filteredData = wilayas
          .filter((instance) =>
            instance.name.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5);

        if (filteredData.length === 0) {
          setResults([]);
          setNotFound(true);
        } else {
          setResults(filteredData);
        }
      };

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(handleSearch, 500); // 500ms debounce delay

      return () => {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }
      };
    }
  }, [query, wilayas]);

  const handleResultClick = (wilaya) => {
    console.log("selected wilaya: ", wilaya);
    navigate(`/hotels/${wilaya}`);
    setResults([]);
  };

  useEffect(() => {
    if (results.length > 0 || query.length === 0) {
      setNotFound(false);
    }
  }, [results, query]);

  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setResults([]);
      setNotFound(false);
    }
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log(results);
  }, [results]);

  return (
    <div ref={containerRef} className="w-full h-full flex justify-center relative">
      <div className="w-full flex justify-between items-center relative">
        <TextField
          id="outlined-search"
          type="search"
          fullWidth
          value={query}
          autoComplete="off" 
          className="!relative !bg-gray-50"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CiSearch className=" text-4xl" />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search for a Place`}
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

      </div>

      {results.length > 0 && (
        <List
          sx={{ width: "100%", backgroundColor: "#e0e0e0", border: "solid 1px #15803d", top: "120%", position: "absolute", zIndex: "10", borderRadius: "10px"}}
        >
          {results.map((result, index) => (
            <ListItemButton
              key={index}
              onClick={() => handleResultClick(result.name)}
            >
              <ListItemIcon>
                <HiOutlineLocationMarker className="text-green-700" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <span className="!text-sm !font-[500]">{result.name}</span>
                }
              />
            </ListItemButton>
          ))}
        </List>
      )}

      {notFound && (
        <List
        sx={{ width: "100%", backgroundColor: "#e0e0e0", border: "solid 1px #15803d", top: "120%", position: "absolute", zIndex: "10", borderRadius: "10px"}}

        >
          <ListItem>
            <ListItemText
              primary={<span className="!text-sm !font-bold">Not Found</span>}
            />
          </ListItem>
        </List>
      )}
    </div>
  );
};

export default HotelSearchBox;
