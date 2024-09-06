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

export const GetData = async (user, setData, token, type) => {
  console.log(user)
  try {
    const res = await axios.get(`${url}/users/data/${type}/${user.id}`, {headers: {Authorization: `Bearer ${token}`}})

    if ( res.status == 200 ) {
      setData(res.data)
    }
  } catch (error) {
    console.log(error)
  }
};

export const GetLiked = async (user, setLiked, token) => {
  try {
    const res = await axios.get(`${url}/users/likes`, {
      user: user,
      headers: {Authorization: `Bearer ${token}`}
    })

    if ( res.status == 200 ) {
      setLiked(res.data)
    }
  } catch (error) {
    
  }
}