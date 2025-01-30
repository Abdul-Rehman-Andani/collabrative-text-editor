import { User } from "../models/user.model.js";
import { ErrorHandler } from "../utils/error.js";
import { signupSchema } from "../schema/auth.schema.js";
import bcrypt from "bcrypt";
import { setToken } from "../utils/setToken.js";

// Signup endpoint
export const signup = async (req, res, next) => {
  try {
    const validationResult = signupSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        message: validationResult.error.errors.map((err) => err.message),
      });
    }

    const { name, email, password } = validationResult.data;

    const user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already exists", 409));
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();

    const token = setToken(newUser._id);

    return res
      .status(201)
      .cookie("token", token)
      .json({ message: "User created successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Signin endpoint
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

  
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User does not exist", 404));
    }

    // Check if stored password exists and is a valid hash
    if (!user.password || user.password.length < 10) {
      return next(new ErrorHandler("Invalid stored password", 500));
    }

    // Compare password with hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid password", 401));
    }

    const token = setToken(user._id);

    return res
      .status(200)
      .cookie("token", token)
      .json({ message: "User logged in successfully" });
  } catch (error) {
    console.error(error); // Log the full error for better insight
    return next(new ErrorHandler(error.message, 500));
  }
};

// Signout endpoint
export const signout = async (req, res, next) => {
  try {
    return res
      .status(200)
      .clearCookie("token")
      .json({ message: "User logged out successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
