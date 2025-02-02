import React, { useEffect, useState } from "react";
import Editor from "../components/Editor";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";

const Document = () => {

  const {showInvite} = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/api/user/auth", {
        withCredentials: true,
      });
      if (res.data.message != "user found") {
        navigate("/signin");
      }
    } catch (error) {
      if (error.response) {
        // If server responded with an error
        setError(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        // If request was made but no response received
        setError("No response from server. Please try again.");
      } else {
        // Other errors
        setError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {

    if (!Cookies.get("token")) {
      navigate("/signin");
    } else {
      checkAuth();
    }
    showInvite();

  }, []);
  return (
    <>
      <Editor />
    </>
  );
};

export default Document;
