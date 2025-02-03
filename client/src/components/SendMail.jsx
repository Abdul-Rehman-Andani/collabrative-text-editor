import React from "react";
import { Input, Button } from "../components/components";

const SendMail = () => {
  const handleInput = () => {};
  const handleSubmit = () => {};
  return (
    <>
      <div className="max-w-md bg-white p-6 w-full rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl mb-4">Send invite</h1>
          <Input
            name={"invite"}
            label={"Invite mail"}
            placeholder={"Invite mail"}
            handleInput={handleInput}
          />
          <Button full label={"Send invite"} />
        </form>
      </div>
    </>
  );
};

export default SendMail;
