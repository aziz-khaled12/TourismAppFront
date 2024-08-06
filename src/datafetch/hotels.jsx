import axios from "axios";


const url = import.meta.env.VITE_LOCAL_BACK_END_URL

export const GetHotels = async (setHotels, token) => {
  try {
    const res = await axios.get(`${url}/hotels`, {
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
      `${url}/hotels/${wilaya}`,
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
    const res = await axios.get(`${url}/locations/wilaya`, {
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
    const res = await axios.get(`${url}/hotels/info/${hotelId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setHotel(res.data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};