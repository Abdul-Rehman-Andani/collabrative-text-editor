import React, { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  BlankDocument,
  Model,
  Documents,
  AddDocument,
} from "../components/components";
import useModelStore from "../hooks/useModelStore";
import useAuthStore from "../hooks/useAuthStore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { isModel } = useModelStore();
  const {revomeInvite} = useAuthStore();

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
    revomeInvite();
  }, []);

  return (
    <>
      {isModel && (
        <Model>
          <AddDocument />
        </Model>
      )}

      <div className="bg-gray-100">
        <Navbar />

        <section>
          <Container>
            <div className="py-2">
              <BlankDocument />
            </div>
          </Container>
        </section>
        <section className="bg-white">
          <Container>
            <h1 className="py-3">Your Documents</h1>
            <Documents />
          </Container>
        </section>
      </div>
    </>
  );
};

export default Home;
