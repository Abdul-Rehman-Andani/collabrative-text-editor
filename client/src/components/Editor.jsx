import React, { useEffect, useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Container, Navbar } from "./components";
import { useParams } from "react-router-dom";
import socket from "../utils/socket";

const Editor = () => {
  const { id } = useParams();
  const [value, setValue] = useState("");

  useEffect(() => {
    socket.emit("open-document", id);

    socket.on("load-document", (docContent) => {
      setValue(docContent || ""); 
    });

    socket.on("edited-document", (docContent) => {
      setValue(docContent || "");
    });

    return () => {
      socket.off("load-document");
      socket.off("edited-document");
    };
  }, [id]);

  const handleChange = (content) => {
    setValue(content);
    socket.emit("edit-document", { docId: id, content });
  };

  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ],
  }), []);

  return (
    <div className="bg-gray-100 h-screen">
      <Navbar />
      <Container>
        <div style={{ width: "100%", margin: "auto", marginTop: "20px" }}>
          <ReactQuill theme="snow" value={value || ""} onChange={handleChange} modules={modules} />
        </div>
      </Container>
    </div>
  );
};

export default Editor;
