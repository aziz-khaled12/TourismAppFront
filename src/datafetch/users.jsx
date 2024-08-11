import axios from "axios";

const url = import.meta.env.VITE_LOCAL_BACK_END_URL;

export const GetRoles = async (setRoles) => {
  try {
    const res = await axios.get(`${url}/users/roles`);
    setRoles(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const GetData = async (user, setHotel, token) => {
  console.log(user);

  try {
    const res = await axios.get(`${url}/users/data/hotel/${user.id}`, {headers: {Authorization: `Bearer ${token}`}})

    if ( res.status == 200 ) {
      setHotel(res.data)
    }
  } catch (error) {
    
  }
};
