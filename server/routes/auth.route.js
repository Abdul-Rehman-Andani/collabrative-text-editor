import { Router } from "express";
import { signin, signout, signup } from "../controllers/auth.controller.js";

const router = Router();

router
    .post("/signup", signup)
    .post("/signin", signin)
    .get("/signout", signout);

export default router;
