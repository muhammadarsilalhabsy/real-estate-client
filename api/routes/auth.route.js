import express from "express";
import { signIn, signUp, googleOauth } from "../controller/auth.controller.js";
const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/google", googleOauth);

export default router;
