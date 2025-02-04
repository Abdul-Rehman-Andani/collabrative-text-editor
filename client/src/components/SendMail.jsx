import React, { useState } from "react";
import { Input, Button } from "../components/components";
import useMailStore from "../hooks/useMailStore";
import useDocumentModelStore from "../hooks/useDocumentModelStore";

const SendMail = () => {
  const { docId, sendInvite } = useMailStore();
  const [email, setEmail] = useState();
  const {closeDocumentModel} = useDocumentModelStore();

  const handleInput = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    sendInvite(email, `http://localhost:5173/document/${docId}`);
    closeDocumentModel();
  };
  return (
    <>
      <div className="max-w-md bg-white p-6 w-full rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl mb-4">Send invite</h1>
          <Input
            name={"email"}
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
