import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { server, app } from "./config/socket.js";
import { connectDB } from "./config/database.js";
import {errorHandler} from "./middlewares/errorHandler.js"
import userRouter from "./routes/user.route.js";
import editorRouter from "./routes/editor.route.js";

// loadind .env
dotenv.config();

// global middlewares
app.use(cors({ credentials: true, origin: ["http://localhost:5173", "*"]}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// api routes
app.use("/api/user/", userRouter);
app.use("/api/editor/", editorRouter);

// error handler middleware
app.use(errorHandler);

// listing to the server
server.listen(process.env.PORT, () => {
  console.log("server");
  // connecting database
  connectDB();
});
