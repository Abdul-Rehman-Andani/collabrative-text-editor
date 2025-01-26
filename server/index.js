import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { server, app } from "./config/socket.js";

app.use(cors({ credentials: true, origin: ["*"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    return res.send("hello world");
});

server.listen(process.env.PORT, () => {
  console.log("server");
});
