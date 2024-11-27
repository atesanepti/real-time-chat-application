import createError from "http-errors";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    const { accessKey } = req.cookies;
    if (!accessKey) {
      next(createError(401, "Authentication failed1!"));
    }

    const decoded = jwt.decode(accessKey);
    if (!decoded) {
      next(createError(401, "Authentication failed2!"));
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      next(createError(401, "Authentication failed3!"));
    }

    req.user = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      blockList : user.blockList
    };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(createError(401, "Authentication failed!4"));
    }
    next(error);
  }
};

