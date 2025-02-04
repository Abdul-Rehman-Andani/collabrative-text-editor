import {ErrorHandler} from "../utils/error.js";
import jwt from "jsonwebtoken";

export const authenticate = (socket, next) => {
    try {
        const cookieHeader = socket.handshake.headers.cookie;
        
        if (!cookieHeader) {
            return next(new ErrorHandler("Authentication error: No cookies found", 401));
        }

        // Find token cookie safely
        const tokenCookie = cookieHeader.split('; ').find(row => row.startsWith('token='));

        if (!tokenCookie) {
            return next(new ErrorHandler("Authentication error: Token not found", 401));
        }

        const token = tokenCookie.split('=')[1];

        if (!token) {
            return next(new ErrorHandler("Authentication error: Empty token", 401));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded; // Attach user data to socket
        next();
    } catch (error) {
        return next(new ErrorHandler("Authentication error: Invalid token", 403));
    }
};
