import axios from "axios";

export const GetHotels = async (setHotels, token) => {
  try {
    const res = await axios.get("http://127.0.0.1:3000/hotels", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setHotels(res.data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const GetWilayaHotels = async (setHotels, wilaya, token) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:3000/hotels/${wilaya}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setHotels(res.data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const GetWilayas = async (setWilayas, token) => {
  try {
    const res = await axios.get("http://127.0.0.1:3000/locations/wilaya", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setWilayas(res.data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const GetHotel = async (setHotel, hotelId, token) => {
  try {
    const res = await axios.get(`http://127.0.0.1:3000/hotels/info/${hotelId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setHotel(res.data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};