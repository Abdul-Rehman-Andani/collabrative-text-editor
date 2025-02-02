import React, { useState ,useEffect} from "react";
import { Input, Button } from "../components/components";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";

export const SignUp = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // State for handling errors

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors before submission

    try {
      const res = await axiosInstance.post("/api/user/signup", input, {
        withCredentials: true,
      });

      if (res.data.message == "User created successfully") {
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
    <div className="w-full h-screen bg-gray-100 grid lg:grid-cols-2 grid-cols-1">
      <div className="h-screen flex items-center justify-center p-2 lg:p-0 ">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl mb-5">Sign up to Collaborative Editor</h1>
          {error && <p className="text-red-500">{error}</p>}
          {/* Show error message */}
          <form onSubmit={handleSubmit}>
            <Input
              handleInput={handleInput}
              label={"Username"}
              type={"text"}
              placeholder={"Username"}
              name={"name"}
              value={input.name}
            />
            <Input
              handleInput={handleInput}
              label={"Email"}
              type={"text"}
              placeholder={"Email"}
              name={"email"}
              value={input.email}
            />
            <Input
              handleInput={handleInput}
              label={"Password"}
              type={"password"}
              placeholder={"Password"}
              name={"password"}
              value={input.password}
            />
            <Button full label={"Sign up"} />
          </form>
          <p className="text-center mt-3">
            <Link to={"/signin"}>Already have an account? Sign in</Link>
          </p>
        </div>
      </div>
      <div className="h-screen lg:block hidden">
        <img src="signin.avif" alt="image" className="h-full object-cover" />
      </div>
    </div>
  );
};
export default SignUp;
