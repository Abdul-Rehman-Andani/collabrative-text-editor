import dotenv from "dotenv";
import express from "express";
import { server, app } from "./config/socket.js";
import { connectDB } from "./config/database.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRouter from "./routes/user.route.js";
import editorRouter from "./routes/editor.route.js";
import mailRouter from "./routes/mail.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// loadind .env
dotenv.config();

// global middlewares
app.use(cors({ credentials: true, origin: ["http://localhost:5173"]}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// api routes
app.use("/api/user/", userRouter);
app.use("/api/editor/", editorRouter);
app.use("/api/mail/", mailRouter);

// error handler middleware
app.use(errorHandler);

// listing to the server
server.listen(process.env.PORT, () => {
  console.log("server");
  // connecting database
  connectDB();
});
