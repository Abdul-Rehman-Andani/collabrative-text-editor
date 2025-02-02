import React, { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignOut = () => {
  const navigate = useNavigate();
  const signOut = async () => {
    const res = await axiosInstance.get(`/api/user/signout`, {
      withCredentials: true,
    });
    if (res.data.message == "User logged out successfully") {
      navigate("/signin");
    }
  };

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/signin");
    } else {
      signOut();
    }
  }, []);

  useEffect(() => {
    document.title = "Signing out";
  }, []);

  return <div>SignOut</div>;
};

export default SignOut;
