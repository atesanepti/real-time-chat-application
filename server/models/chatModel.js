import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        requrired: true,
      },
    ],
    deletedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    chatCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      requrired: true,
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Chat = new mongoose.model("chat", chatSchema);

export default Chat;
