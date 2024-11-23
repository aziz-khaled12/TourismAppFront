import React, { useState, useContext, createContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const url = import.meta.env.VITE_LOCAL_BACK_END_URL;

const AuthContext = createContext({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  login: (email, password, setError, setIsLogged) => Promise.resolve(undefined),
  signup: (email, password, username, role, setIsLogged, setError) =>
    Promise.resolve(undefined),
  verifyToken: () => Promise.resolve(undefined),
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser ? storedUser : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedLogged = localStorage.getItem("isLogged");
    return storedLogged ? storedLogged : false;
  });
  const [accessToken, setAccessToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? storedToken : null;
  });

  const verifyToken = async () => {
    if (accessToken) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${url}/auth/verify-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status != 200) {
          // Token is invalid
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("isLogged");

          setIsAuthenticated();
          setAccessToken();
          setUser();

          window.alert("session expired please login");
        }
      } catch (err) {
        if (
          (accessToken && err.response && err.response.status === 401) ||
          err.response.status === 500
        ) {
          // Token is invalid or expired
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("isLogged");

          setIsAuthenticated();
          setAccessToken();
          setUser();

          window.location.href = "/login";
        } else {
        }
      }
    }
  };

  const login = async (email, password, setError, setIsLogged, setLoading) => {
    try {
      const res = await axios.post(`${url}/auth/login`, {
        email,
        password,
      });
      if (res.status && res.status == 200) {
        const token = res.data.token;
        const decodedToken = jwtDecode(token);
        const user = decodedToken.user_data;

        console.log("user:", user);

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("isLogged", true);


        setIsAuthenticated(true);
        setAccessToken(token);
        setIsLogged(true);
        setUser(user);
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password, please try again");
        return false;
      } else {
        setError("Something went wrong");
      }
    }
    setLoading(false);
  };

  const signup = async (
    email,
    password,
    username,
    role,
    setIsLogged,
    setError
  ) => {
    try {
      const response = await axios.post(`${url}/auth/signup`, {
        email,
        password,
        username,
        role,
      });

      if (response.status && response.status == 200) {
        console.log(response);
        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        const user = decodedToken.user_data;

        localStorage.setItem("user", JSON.stringify(user));


        localStorage.setItem("token", token);
        localStorage.setItem("isLogged", true);

        setIsAuthenticated(true);
        setAccessToken(token);
        setIsLogged(true);
        setUser(user);
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const logout = () => {

    try {
     setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("isLogged");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    } catch (error) {
      console.log(error)
    }
  
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        login,
        logout,
        signup,
        verifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
