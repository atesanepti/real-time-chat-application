import Chat from "../models/chatModel.js";
import createError from "http-errors";
import User from "./../models/userModel.js";

export const createChat = async (req, res, next) => {
  try {
    console.log("c", [...req.body.users]);
    const oldChat = await Chat.findOne({
      $or: [
        {
          users: {
            $all: req.body.users,
          },
        },
        {
          deletedUsers: { $in: [...req.body.users] },
          users: { $in: [...req.body.users] },
        },
      ],
    }).populate([
      {
        path: "users",
        select: "_id email name userName image",
      },
      {
        path: "chatCreator",
        select: "_id email name userName  image",
      },
      {
        path: "deletedUsers",
        select: "_id email name userName  image",
      },
    ]);

    if (oldChat)
      return res
        .status(200)
        .json({ message: "Chat already exist", payload: oldChat });

    let chat = new Chat(req.body);
    chat = await chat.save();
    chat = await chat.populate([
      {
        path: "chatCreator",
        select: "_id email name userName ",
      },
      {
        path: "users",
        select: "_id email name userName ",
      },
    ]);

    return res.status(201).json({
      message: "New chat created",
      payload: chat,
    });
  } catch (error) {
    next(error);
  }
};

// export const findChat = async (req,res,next)=>{
//   try {

//   } catch (error) {
//     next(error)
//   }
// }

export const blockChat = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) next(createError(404, "Chat not found"));

    const blockBy = req.user._id;

    // if (chat.block.isBlock) {
    //   return next(createError(400, "Chat is already blocked"));
    // }

    const updatedUser = await User.findByIdAndUpdate(blockBy, {
      $push: { blockList: id },
    });

    if (!updatedUser) {
      return next(createError(400, "User was't blocked"));
    }
    return res.status(200).json({
      message: "Blocked",
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteChat = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) next(createError(400, "Chat id not found"));

    const chat = await Chat.findById(id).lean();
    if (!chat) return next(createError(400, "Chat not found"));

    const users = chat.users.map((u) => JSON.stringify(u));

    if (!users.includes(JSON.stringify(req.user._id))) {
      return next(
        createError(400, "You have to access chat to delete this chat")
      );
    }

    const updatePayload = {
      $pull: {
        users: req.user._id,
      },
      $push: {
        deletedUsers: req.user._id,
      },
    };

    const updatedChat = await Chat.findByIdAndUpdate(chat._id, updatePayload, {
      $new: true,
    }).populate([
      {
        path: "users",
        select: "_id email name userName image",
      },
      {
        path: "chatCreator",
        select: "_id email name userName image",
      },
      {
        path: "deletedUsers",
        select: "_id email name userName image",
      },
    ]);

    if (!updatedChat) return next(createError(400, "Chat was not deleted"));

    if (updatedChat.users.length == 0) {
      const deletedChat = await Chat.findByIdAndDelete(updatedChat._id);
      if (!deleteChat) return next(createError(400, "Chat was not deleted"));

      //delete all of messages of this chat
      // const messages = new Message.find({ chat: deletedChat._id });

      return res
        .status(200)
        .json({ message: "Chat deleted", payload: deletedChat });
    }

    res.status(200).json({ message: "Chat deleted", payload: updatedChat });
  } catch (error) {
    next(error);
  }
};

export const updateChat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const payload = {
      name,
    };

    const updatedChat = await Chat.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    }).populate([
      {
        path: "users",
        select: "_id email name userName image",
      },
      {
        path: "chatCreator",
        select: "_id email name userName image",
      },
    ]);

    if (!updatedChat) {
      return next(createError(400, "Chat was not updatad"));
    }

    return res
      .status(200)
      .json({ message: "Chat was updated", payload: updatedChat });
  } catch (error) {
    next(error);
  }
};

export const findChats = async (req, res, next) => {
  try {
    const id = req.user._id;

    // const queries = {
    //   $or: [
    //     {
    //       $and: [
    //         {
    //           chatCreator: id,
    //         },
    //         {
    //           deletedUser: { $ne: id },
    //         },
    //       ],
    //     },
    //     {
    //       $and: [
    //         {
    //           isActive: true,
    //           users: id,
    //         },
    //         {

    //         }
    //       ],
    //     },
    //   ],
    // };

    const queries = {
      $and: [
        {
          users: id,
          $or: [
            {
              isActive: true,
            },
            {
              chatCreator: id,
            },
          ],
        },
        {
          deletedUser: { $ne: id },
        },
      ],
    };

    const chats = await Chat.find(queries)
      .populate("users", "_id email name userName image ")
      .populate("chatCreator", "_id email name userName image ");
    const total = await Chat.countDocuments(queries);
    return res
      .status(200)
      .json({ message: "Chats returned", payload: chats, total: total });
  } catch (error) {
    next(error);
  }
};

export const findRequestedChats = async (req, res, next) => {
  try {
    const id = req.user._id;

    const queries = {
      isActive: false,
      users: id,
      chatCreator: { $ne: id },
    };

    let chats = await Chat.find(queries)
      .populate([
        {
          path: "users",
          select: "_id email name userName image",
        },
        {
          path: "chatCreator",
          select: "_id email name userName image",
        },
        {
          path: "deletedUsers",
          select: "_id email name userName image",
        },
      ])
      .lean();
    const total = await Chat.countDocuments(queries);

    chats.forEach((c) => {
      c.users = c.users.filter(
        (u) => u._id.toString() !== req.user._id.toString()
      )[0];
    });
    console.log(chats);
    return res
      .status(200)
      .json({ message: "Chat returned", payload: chats, total });
  } catch (error) {
    next(error);
  }
};

export const blockByCheck = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id, { blockList: 1 }).lean();
    if (!user) return next(createError(404, "User not found"));

    let blcokedBy = "";
    const otherUserBlockList = user.blockList?.map((l) => l.toString());
    const userBlockList = req.user.blockList?.map((l) => l.toString());
    if (otherUserBlockList?.includes(req.user._id.toString())) {
      blcokedBy = user._id;
    } else if (userBlockList?.includes(user._id.toString())) {
      blcokedBy = req.user._id;
    }

    return res.status(200).json({ blcokedBy });
  } catch (error) {
    next(error);
  }
};

export const unBlockChat = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { blockList: id } },
      { new: true, projection: { password: 0 } }
    );

    if (!updatedUser) return next(createError(400, "un blocking failed"));

    return res.status(200).json({ payload: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const activeChat = async (req, res, next) => {
  try {
    const { chatId } = req.params;

    if (!chatId) return next(createError(400, "Chat id is required"));

    const chat = await Chat.findById(chatId);
    if (!chat) return next(createError(404, "Chat not found"));

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { isActive: true },
      { new: true }
    );

    if (!updateChat) return next(createError(403, "Chat was not updated"));

    return res
      .status(200)
      .json({ message: "Chat is activated", payload: updatedChat });
  } catch (error) {
    next(error);
  }
};
