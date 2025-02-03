import React from "react";
import Model from "./Model";
import { SendMail } from "./components";
import useDocumentModelStore from "../hooks/useDocumentModelStore";

const DocumentModel = () => {
  const {closeDocumentModel} = useDocumentModelStore();
  return (
    <>
      <Model close={closeDocumentModel}>
        <SendMail />
      </Model>
    </>
  );
};

export default DocumentModel;
