import { io } from "socket.io-client";

const socket = io("ws://localhost:9000", {
  withCredentials: true,
});

export default socket;
