import { Router } from "express";
import { sendInvite } from "../controllers/mail.controller.js";

const router = Router();

router.post("/invite", sendInvite)


export default router;