import { Router } from "express";
import { signin, signout, signup } from "../controllers/user.controller.js";

const router = Router();

router
    .post("/signup", signup)
    .post("/signin", signin)
    .get("/signout", signout);

export default router;
