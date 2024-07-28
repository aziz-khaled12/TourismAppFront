import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./TextField.css";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GetRoles } from "../datafetch/users";
import { useAuth } from "../context/AuthContext";
const Signup = () => {

  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "",
    confirmPassword: "",
  });

  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [roles, setRoles] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [logged, setIsLogged] = useState(false)

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

    if (!formData.userName) {
      setUserNameError("User name is required");
      isValid = false;
    } else {
      setUserNameError("");
    }

    if (!formData.email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!formData.role) {
      setRoleError("Role is required");
      isValid = false;
    } else {
      setRoleError("");
    }
    if (!formData.password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!formData.confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (isValid) {
      await signup(formData.email, formData.password, formData.userName, formData.role, setIsLogged, setError);
    }
  };

  useEffect(() => {
    GetRoles(setRoles);
  }, []);

  useEffect(() => {
    if (roles) {
      console.log(roles);
      setLoading(false);
    }
  });

  return loading ? (
    <>
      <div className="w-full min-h-screen flex items-center justify-center flex-col m-auto">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <style>{`.spinner_z9k8{transform-origin:center;animation:spinner_StKS .75s infinite linear}@keyframes spinner_StKS{100%{transform:rotate(360deg)}}`}</style>
          <path
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25"
          />
          <path
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
            className="spinner_z9k8"
          />
        </svg>
      </div>
    </>
  ) : (
    <div className="w-full min-h-screen flex items-center justify-center flex-col m-auto">
      <div className="w-full flex items-center justify-center">
        <div className="flex w-full items-center flex-col">
          <form
            className="w-[370px] bg-[#f9f9f9] p-6 rounded-3xl"
            onSubmit={handleSubmit}
          >
            <div className="mb-8">
              <Typography variant="overline" display="block" gutterBottom>
                LET'S GET YOU STARTED
              </Typography>
              <Typography variant="h5" gutterBottom>
                Create an account
              </Typography>
            </div>
            <div className="w-full mb-4">
              <TextField
                error={Boolean(userNameError)}
                helperText={userNameError}
                className="w-full"
                id="outlined-basic"
                label="Username"
                variant="outlined"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
            <div className="w-full mb-4">
              <TextField
                error={Boolean(emailError)}
                helperText={emailError}
                className="w-full"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="w-full mb-4">
              {roles && (
                <FormControl className="!w-full" error={Boolean(roleError)}>
                  <InputLabel id="demo-simple-select-required-label">
                    Role
                  </InputLabel>
                  <Select
                    className="!w-full"
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={formData.role}
                    name="role"
                    label="Role"
                    onChange={handleChange}
                  >
                    {roles.map((role) => {
                      return (
                        <MenuItem key={role.id} value={role.id}>
                          {role.role_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>{roleError}</FormHelperText>
                </FormControl>
              )}
            </div>
            <div className="w-full mb-4">
              <TextField
                error={Boolean(passwordError)}
                helperText={passwordError}
                className="w-full"
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="w-full mb-4">
              <TextField
                error={Boolean(confirmPasswordError)}
                helperText={confirmPasswordError}
                className="w-full"
                id="outlined-basic"
                label="Confirm Password"
                type="password"
                variant="outlined"
                name="confirmPassword"
                value={formData.confirmPassword}
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
              GET STARTED
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
                className="!bg-white !text-primary !rounded-lg !p-3 !mb-4 w-full"
              >
                <FcGoogle className="absolute left-5 text-xl" /> Sign up with
                Google
              </Button>
              <Button
                type="button"
                variant="contained"
                className="!bg-white !text-primary !rounded-lg !p-3 !mb-4 w-full"
              >
                <FaFacebook className="text-blue-800 absolute left-5 text-xl" />
                Sign up with Facebook
              </Button>
              <Button
                type="button"
                variant="contained"
                className="!bg-white !text-primary !rounded-lg !p-3 !mb-4 w-full"
              >
                <FaApple className="absolute left-5 text-xl" />
                Sign up with Apple
              </Button>
            </div>
            <div className="flex items-center justify-center w-full">
              <Typography variant="subtitle2" display="block" gutterBottom>
                Already have an account?{" "}
                <Link className="font-bold" to={"/login"}>
                  Login
                </Link>
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
