import {Router } from "express";
import {create} from "../controllers/editor.controller.js";
import {authenticate} from "../middlewares/auth.js";

const router = Router();

router
    .post("/",authenticate ,create)

export default router;