import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Container from "./Container";
import { Link } from "react-router-dom";

const MyDocuments = () => {
  const [docs, setDocs] = useState([]);

  const getDocs = async () => {
    const res = await axiosInstance.get("/api/editor/", {
      withCredentials: true,
    });
    setDocs(res.data);
  };

  useEffect(() => {
    getDocs();
  }, []);

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
        {docs.length > 0 ? (
          docs.map((doc, i) => {
            return (
              <Link to={`/document/${doc._id}`}>
                <div className="border border-gray-200 bg-gray-100 rounded-sm p-2">
                  <h3 className="font-bold text-[18px] pb-1">{doc.title}</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: doc.content }}
                    className="text-[11px]"
                  />{" "}
                  {/* Or */}
                </div>
              </Link>
            );
          })
        ) : (
          <p>Your don't have any document yet .</p>
        )}
      </div>
    </>
  );
};

export default MyDocuments;
