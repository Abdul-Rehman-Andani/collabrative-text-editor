import React from "react";
import { Button, Container } from "./components";
import { Link } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";

const Navbar = () => {
  const { isSignin } = useAuthStore();
  return (
    <>
      <nav className="w-full bg-white shadow-md">
        <Container>
          <div className="py-3 flex justify-between items-center">
            <span className="font-bold">Collab</span>
            <div className="btns">
              <Link to={"/signin"}>
                <Button label={"Sign out"} />
              </Link>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
