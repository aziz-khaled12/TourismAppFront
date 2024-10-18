import axios from "axios";
const url = import.meta.env.VITE_LOCAL_BACK_END_URL;



export const GetPlaces = async (setPlaces, token) => {
  try {
    const res = await axios.get(`${url}/locations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPlaces(res.data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const GetPlace = async (setPlace, placeId, token) => {
  try {
    const res = await axios.get(`${url}/locations/info/${placeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPlace(res.data[0]);
  } catch (error) {
    console.log(error);
  }
};

export const GetWilayaPlaces = async (setPlaces, wilaya, token) => {
  try {
    const res = await axios.get(`${url}/locations/${wilaya}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPlaces(res.data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const GetWilayaBestPlaces = async (setPlaces, wilaya, token, limit) => {
  try {
    const res = await axios.get(`${url}/locations/${wilaya}/best?limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPlaces(res.data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
