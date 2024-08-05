import axios from "axios";

export const GetRestaurants = async (setRestaurants, token) => {
  try {
    const res = await axios.get("http://127.0.0.1:3000/restaurants", {
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
    const res = await axios.get(`http://127.0.0.1:3000/restaurants/${wilaya}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRestaurants(res.data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const GetRestaurant = async (setRestaurant, restaurantId, token) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:3000/restaurants/info/${restaurantId}`,
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
      `http://127.0.0.1:3000/restaurants/nearby?lat=${lat}&lon=${lon}&radius=${radius}`,
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
