import express from "express";
import { signIn, signUp } from "../controller/auth.controller.js";
const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);

export default router;
