import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";
import createError from "http-errors";

export const findMessages = async (req, res, next) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);
    if (!chat) return next(createError(404, "chat not found"));

    const messages = await Message.find({ chat: chatId })
      .populate([
        {
          path: "sender",
          select: "_id name userName email image",
        },
        {
          path: "deletedBy",
          select: "_id name userName email image",
        },
        {
          path: "chat",
          select: "_id",
        },
      ])
      .sort({ createdAt: 1 });

    return res
      .status(200)
      .json({ message: "Messages fetched", payload: messages });
  } catch (error) {
    next(error);
  }
};

export const createMessage = async (req, res, next) => {
  try {
    const { text } = req.body;
    const image = req.file;
    const { chatId } = req.params;

    if (!image && !text) {
      return next(createError(400, "Message cann't be empty"));
    }

    const sender = req.user._id;

    const payload = {
      sender,
      chat: chatId,
    };

    if (text) {
      payload.text = text;
    }

    if (image) {
      if (image.size < 1024 * 1024) {
        payload.image = `${process.env.SERVER}/upload/${image.pathname}`;
      } else {
        return next(createError(400, "Image size should be within 1MB"));
      }
    }

    let newMessage = new Message(payload);
    newMessage = await newMessage.save();
    newMessage = await newMessage.populate([
      {
        path: "sender",
        select: "_id email name userName image",
      },
      {
        path: "chat",
        select: "_id",
      },
    ]);

    return res
      .status(201)
      .json({ message: "Message saved", payload: newMessage });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;

    const deletedBy = req.user._id;
s
    const message = await Message.findById(messageId);
    if (!message) return next(createError(404, "Message not found"));

    const chat = await Chat.findOne({
      _id: message.chat,
      $or: [
        {
          users: deletedBy,
        },
        { deletedUsers: deletedBy },
      ],
    });

    if (!chat) return next(createError(404, "Message was not deleted"));

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { deletedBy },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Message deleted", payload: updatedMessage });
  } catch (error) {
    next(error);
  }
};
