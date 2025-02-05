import { Router } from "express";
import { create, generatePdf, read } from "../controllers/editor.controller.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router
  .post("/", authenticate, create)
  .get("/", authenticate, read)
  .get("/generate-pdf/:id", generatePdf);

export default router;
