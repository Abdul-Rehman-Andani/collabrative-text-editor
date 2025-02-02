import { Router } from "express";
import {
  signin,
  signout,
  signup,
  auth,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router
  .post("/signup", signup)
  .post("/signin", signin)
  .get("/signout", signout)
  .get("/auth", authenticate, auth);

export default router;
