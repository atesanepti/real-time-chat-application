import express from "express";
const router = express.Router();

import {
  createUser,
  updateUser,
  userVerify,
  forgetPassword,
  resetPassword,
  findUser,
  findMine,
  changePassword,
  setBio,
  deleteUser,
  otpVerify,
  getUsers,
} from "../controllers/userController.js";
import { upload } from "../helper/multer.js";
import { authenticate } from "./../middlewares/authMiddleware.js";
import { userValidation } from "../validation/userValidate.js";

router
  .route("/")
  .post(upload.single("userImage"), userValidation, createUser)
  .put(authenticate, upload.single("userImage"), updateUser)
  .delete(authenticate, deleteUser)
  .get(authenticate , getUsers)
  
router.get("/mine", authenticate, findMine);
router.post("/verify", userVerify);
router.get("/forget-password/:email", forgetPassword);
router.put("/reset-password", resetPassword);
router.post("/otp-verify", otpVerify);
router.put("/change-password", authenticate, changePassword);
router.post("/bio", authenticate, setBio);
router.get("/:id", authenticate, findUser);
export default router;
