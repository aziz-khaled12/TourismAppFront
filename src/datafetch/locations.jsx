import axios from "axios";


export const GetHotels = async (setHotels, token) => {
  
  try {
    const res = await axios.get("http://127.0.0.1:3000/locations/hotels", {
      headers: { Authorization: `${token}` },
    });
    setHotels(res.data);
    console.log(res.data)
  } catch (error) {
    console.log(error);
  }
};
