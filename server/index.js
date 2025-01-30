import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { server, app } from "./config/socket.js";
import { connectDB } from "./config/database.js";
import { ErrorHandler } from "./utils/error.js";
import authRouter from "./routes/auth.route.js";

// loadind .env
dotenv.config();

// global middlewares
app.use(cors({ credentials: true, origin: ["*"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// api routes
app.use("/api/auth/", authRouter);

// error handler middleware
app.use(ErrorHandler);

// listing to the server
server.listen(process.env.PORT, () => {
  console.log("server");
  // connecting database
  connectDB();
});
