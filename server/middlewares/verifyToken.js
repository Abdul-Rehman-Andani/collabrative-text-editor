import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/error.js";
import cookieParser from "cookie-parser"; // Import cookie-parser

// Use cookie-parser middleware before socket.io server
export const authenticate = (socket, next) => {
    const token = socket.handshake.headers.cookie?.split('; ').find(row => row.startsWith('token=')).split('=')[1];

    if (!token) {
        return next(new ErrorHandler("Authentication error: Token required", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded; // Attach user data to socket
        next();
    } catch (error) {
        return next(new ErrorHandler("Authentication error: Invalid token", 403));
    }
};
