import axios from "axios";

export const GetRoles = async (setRoles) => {
  try {
    const res = await axios.get("http://127.0.0.1:3000/users/roles");
    setRoles(res.data)
  } catch (error) {
    console.log(error);
  }
};
