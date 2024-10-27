import express from "express";
import {
  allUsers,
  loginUser,
  registerUser,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", loginUser);
router.route("/").get(protect, allUsers);

export default router;
