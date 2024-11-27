import mongoose from "mongoose";
import express from "express";

import { authenticate } from "./../middlewares/authMiddleware.js";
import {
  findMessages,
  createMessage,
  deleteMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router
  .route("/:chatId")
  .get(authenticate, findMessages)
  .post(authenticate, createMessage);

router.route("/:messageId").delete(authenticate, deleteMessage);
// .get("/:messageId", authenticate,findChat);

export default router;
