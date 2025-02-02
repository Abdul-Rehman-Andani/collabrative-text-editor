import express from "express";
import { Server } from "socket.io";
import http from "http";
import { Editor } from "../models/editor.model.js";
import { authenticate } from "../middlewares/verifyToken.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow your React app's origin
    methods: ["GET", "POST"],
    credentials: true, // Allow cookies (if using JWT in cookies)
  },
});

// Apply authentication middleware
io.use(authenticate);

io.on("connection", (socket) => {
  console.log("User connected:", socket.user);

  socket.on("open-document", async (docId) => {
    const document = await Editor.findOne({ _id: docId });
    socket.emit("load-document", document.content);
  });

  socket.on("edit-document", async ({ docId, content }) => {
    const document = await Editor.findOneAndUpdate(
      { _id: docId },
      { content },
      { new: true }
    );

    io.emit("edited-document", document.content);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.user);
  });
});

export { app, server, io };
