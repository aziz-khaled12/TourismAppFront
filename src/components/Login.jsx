import React, { useEffect, useState } from "react";
import { Alert, Button, TextField, Typography } from "@mui/material";
import "./TextField.css";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, accessToken, user } = useAuth();
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!formData.email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!formData.password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      await login(formData.email, formData.password, setError, setIsLogged);
    }
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  });

  useEffect(() => {
    console.log('import.meta.env:', import.meta.env);
  }, []);
  

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center flex-col m-auto">
        <div className="w-full flex items-center justify-center">
          <div className="flex w-full items-center flex-col p-5">
            {/* <div className="mb-4 flex items-center flex-col">
            <FaGoogle className="text-8xl mb-2" />
            <div className="text-4xl font-bold mb-2">Company Name</div>
          </div>
             */}
            <form
              onSubmit={handleSubmit}
              className="w-[410px] bg-[#f9f9f9] p-10 rounded-3xl"
            >
              <div className="mb-8">
                <Typography variant="overline" display="block" gutterBottom>
                  WELCOME BACK
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Log In to your Account
                </Typography>
              </div>
              <div className="w-full mb-4">
                <TextField
                  error={Boolean(emailError)}
                  helperText={emailError}
                  className="w-full"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full mb-4">
                <TextField
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                  className="w-full"
                  label="Password"
                  type="password"
                  variant="outlined"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {error && error.length ? (
                <Alert variant="outlined" severity="error" className="!mb-4">
                  {error}
                </Alert>
              ) : (
                ""
              )}

              <Button
                type="submit"
                variant="contained"
                className="!bg-primary !rounded-lg !p-4 w-full"
              >
                Continue
              </Button>

              <div className="flex w-full justify-between items-center my-4">
                <div className="w-[40%] h-[1px] bg-secondary"></div>
                Or
                <div className="w-[40%] h-[1px] bg-secondary"></div>
              </div>

              <div className="w-full">
                <Button
                  type="button"
                  variant="contained"
                  className="!bg-white !text-primary !rounded-lg !p-3 !mb-4 w-full !normal-case"
                >
                  <FcGoogle className="absolute left-5 text-xl" /> Sign up with
                  Google
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  className="!bg-white !text-primary !rounded-lg !p-3 !mb-4 w-full !normal-case"
                >
                  <FaFacebook className="text-blue-800 absolute left-5 text-xl" />
                  Log in with Facebook
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  className=" !bg-white !text-primary !rounded-lg !p-3 !mb-4 w-full !normal-case"
                >
                  <FaApple className="absolute left-5 text-xl" />
                  Log in with Apple
                </Button>
              </div>
              <div className="flex items-center justify-center w-full">
                <Typography variant="subtitle2" display="block" gutterBottom>
                  You don't have an account?{" "}
                  <Link className="font-bold" to={"/signup"}>
                    Signup
                  </Link>
                </Typography>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
