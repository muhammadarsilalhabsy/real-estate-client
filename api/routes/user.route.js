import express from "express";
import { getUser, updateUser } from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/get", getUser);
router.post("/update/:id", verifyToken, updateUser);

export default router;
