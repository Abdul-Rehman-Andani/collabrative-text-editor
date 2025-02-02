import React, { useEffect, useState } from "react";
import { Input, Button } from "../components/components";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";

export const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/user/signin", input, {
        withCredentials: true,
      });
      if (res.data.message == "User logged in successfully") {
        navigate("/");
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
    document.title = "Sign in";
  }, []);
  // useEffect(() => {
  //   if(document.cookie.includes("token")){
  //     navigate("/");
  //   }
  // }, []);

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/api/user/auth", {withCredentials : true});
      if(res.data.message == "user found"){
        navigate("/");
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
  }

  useEffect(() => {
    if(Cookies.get("token")){
      checkAuth();
    }
  }, []);

  return (
    <>
      <div className="w-full h-screen bg-gray-100 grid lg:grid-cols-2 grid-cols-1">
        <div className="h-screen flex items-center justify-center p-2 lg:p-0">
          <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl mb-5">Sign in to Collabrative Editor</h1>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit}>
              <Input
                label={"Email"}
                type={"text"}
                placeholder={"Email"}
                name={"email"}
                handleInput={handleInput}
                value={input.email}
              />
              <Input
                label={"Password"}
                type={"password"}
                placeholder={"Password"}
                name={"password"}
                value={input.password}
                handleInput={handleInput}
              />
              <Button full label={"Sign in"} />
            </form>
            <p className="text-center mt-3">
              <Link to={"/signup"}>Already have an account ? Sign up</Link>
            </p>
          </div>
        </div>
        <div className="h-screen lg:block hidden">
          <img src="signin.avif" alt="imge" className="h-full object-cover" />
        </div>
      </div>
    </>
  );
};
export default SignIn;
