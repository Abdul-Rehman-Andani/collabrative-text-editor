import React from "react";
import { Input, Button } from "../components/components";
import { Link } from "react-router-dom";

export const SignUp = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="w-full h-screen bg-gray-100 grid lg:grid-cols-2 grid-cols-1">
        <div className="h-screen flex items-center justify-center p-2 lg:p-0 ">
          <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg ">
            <h1 className="text-2xl mb-5">Sign up to Collabrative Editor </h1>
            <form onSubmit={handleSubmit}>
              <Input
                label={"Username"}
                type={"text"}
                placeholder={"Username"}
                name={"username"}
              />
              <Input
                label={"Email"}
                type={"text"}
                placeholder={"Email"}
                name={"email"}
              />
              <Input
                label={"Password"}
                type={"password"}
                placeholder={"Password"}
                name={"password"}
              />
              <Button full label={"Sign up"} />
            </form>
            <p className="text-center mt-3">
              <Link to={"/signin"}>Don't an have account ? Sign up</Link>
            </p>
          </div>
        </div>
        <div className="h-screen lg:block hidden">
          <img src="signin.avif" alt="image" className="h-full object-cover" />
        </div>
      </div>
    </>
  );
};
export default SignUp;
