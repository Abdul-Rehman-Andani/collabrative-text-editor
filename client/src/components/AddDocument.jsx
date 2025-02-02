import React, { useState } from "react";
import { Input, Button } from "../components/components";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddDocument = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    title: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/editor/", input, {
        withCredentials: true,
      });

      navigate(`/document/${res.data.docId}`);
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

  return (
    <>
      <div className="max-w-md bg-white p-6 w-full rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl mb-4">Create Document</h1>
          <Input
            name={"title"}
            label={"Title"}
            placeholder={"Title"}
            handleInput={handleInput}
          />
          <Button full label={"Create"} />
        </form>
      </div>
    </>
  );
};

export default AddDocument;
