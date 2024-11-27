import express from "express";
const router = express.Router();

import { authenticate } from "../middlewares/authMiddleware.js";
import {
  createChat,
  blockChat,
  deleteChat,
  updateChat,
  findChats,
  findRequestedChats,
  blockByCheck,
  unBlockChat,
  activeChat,
} from "../controllers/chatController.js";
import { chatValidation } from "./../validation/chatValidate.js";

router
  .route("/")
  .post(authenticate, chatValidation, createChat)
  .get(authenticate, findChats);

router.put("/block/:id", authenticate, blockChat);
router.put("/unblock/:id", authenticate, unBlockChat);
router.get("/request-chat", authenticate, findRequestedChats);
router.get("/check-chat-access/:id", authenticate, blockByCheck);
router.put("/activate-chat/:chatId", authenticate, activeChat);

router
  .route("/:id")
  // .put(authenticate, updateChat)
  .delete(authenticate, deleteChat);
export default router;
