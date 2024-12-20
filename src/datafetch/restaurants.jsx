import axios from "axios";


const url = import.meta.env.VITE_LOCAL_BACK_END_URL

export const GetRestaurants = async (setRestaurants, token) => {
  try {
    const res = await axios.get(`${url}/restaurants`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRestaurants(res.data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const GetWilayaRestaurants = async (setRestaurants, wilaya, token) => {
  try {
    const res = await axios.get(`${url}/restaurants/${wilaya}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const sortedRestaurants = res.data.sort((a, b) => b.rating - a.rating);
    setRestaurants(sortedRestaurants);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const GetRestaurant = async (setRestaurant, restaurantId, token) => {
  try {
    const res = await axios.get(
      `${url}/restaurants/info/${restaurantId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setRestaurant(res.data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const GetNearby = async (setNearby, lat, lon, radius, token) => {
  try {
    const res = await axios.get(
      `${url}/restaurants/nearby?lat=${lat}&lon=${lon}&radius=${radius}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setNearby(res.data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const GetMenu = async (id, accessToken, setData) => {
  try {
    
  } catch (error) {
    
  }
}

export const GetWilayaBestRestaurants = async (setRestaurants, wilaya, token, limit) => {
  try {
    const res = await axios.get(`${url}/restaurants/${wilaya}/best?limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRestaurants(res.data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
