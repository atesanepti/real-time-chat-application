import express from "express";

import {
  loginUser,
  logoutUser,
  protectedUser,
} from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.post("/login", loginUser)
router.get("/logout", authenticate,logoutUser);
router.get("/protected", protectedUser);


export default router