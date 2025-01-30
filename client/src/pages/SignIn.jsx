import React from "react";
import { Input, Button } from "../components/components";
import { Link } from "react-router-dom";

export const SignIn = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="w-full h-screen bg-gray-100 grid lg:grid-cols-2 grid-cols-1">
        <div className="h-screen flex items-center justify-center p-2 lg:p-0">
          <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl mb-5">Sign in to Collabrative Editor</h1>
            <form onSubmit={handleSubmit}>
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
