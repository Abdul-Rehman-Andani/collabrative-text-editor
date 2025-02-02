import { ErrorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  try {
    // 1. Check if token is missing
    if (!req.cookies.token) {
      return next(new ErrorHandler("User doesn't have a token", 401));
    }

    // 2. Get token from cookies
    const { token } = req.cookies;

    // 3. Verify token
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    if (!verify) {
      return next(new ErrorHandler("Invalid token", 401));
    }

    const { id } = verify;

    // 4. Check if user exists
    const user = await User.findOne({ _id: id });

    if (!user) {
      return next(new ErrorHandler("User does not exist with this ID", 404));
    }

    // 5. Attach user ID to the request object for further use
    req.id = user._id;

    // Proceed to the next middleware or route handler
    return next();
  } catch (error) {
    console.error(error); // Log the error for debugging
    return next(new ErrorHandler(error.message, 500));
  }
};

