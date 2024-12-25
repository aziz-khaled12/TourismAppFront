import React from "react";
import { CiMap } from "react-icons/ci";
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
const Header = ({ handleBack, title, map = false, cart = false }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full mt-10 border-[#6e6e6e] border-b border-solid">
      <div className="w-full flex justify-between p-4 mb-3">
        <div className="flex items-center font-[600] text-xl ">
          <SlArrowLeft className="mr-3 cursor-pointer" onClick={handleBack} />
          {title}
        </div>

        {map && (
          <div className="flex items-center text-3xl ">
            <CiMap
              className="cursor-pointer"
              onClick={() => {
                navigate("/map");
              }}
            />
          </div>
        )}


        
      </div>
    </div>
  );
};

export default Header;
