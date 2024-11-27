import Chat from "../models/chatModel.js";
import createError from "http-errors";
import User from "../models/userModel.js";

export const chatValidation = async (req, res, next) => {
  try {
    let { users } = req.body;
    const payload = {};

    payload.chatCreator = req.user._id;
    console.log(req.body);
    if (!users || users.length < 2) {
      next(createError(400, "Minimum 2 users need to start a new chat"));
    }
    // users = JSON.parse(users);

   

    const usersInfo = await User.find(
      { _id: [...users] },
      { name: 1, email: 1, _id: 1, blockList: 1 }
    ).lean();

    if (usersInfo.length < 2) {
      next(createError(400, "Minimum 2 users need to start a new chat"));
    }

    const otherUser = usersInfo.find((u) => u._id !== req.user._id);
    if (otherUser.blockList && otherUser.blockList.includes(req.user._id)) {
      return next(createError(400, "The user blocked you"));
    }

    payload.users = users;
    payload.block = { isBlock: false, blockBy: null };
    req.body = payload;

    next();
  } catch (error) {
    next(error);
  }
};
