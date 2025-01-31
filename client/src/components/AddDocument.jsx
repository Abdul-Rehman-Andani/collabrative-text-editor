import React, { useState } from "react";
import { Input, Button } from "../components/components";

const AddDocument = () => {
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
      console.log(input);
    } catch (error) {}
  };

  return (
    <>
      <div className="max-w-md bg-white p-6 w-full rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
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
