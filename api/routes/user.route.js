import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  getUserListing,
} from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/:id", verifyToken, getUser);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.post("/listings/:id", verifyToken, getUserListing);

export default router;
