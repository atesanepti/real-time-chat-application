import User from "../models/userModel.js";
import createError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res, next) => {
  try {
    const { loggToken, password } = req.body;

    const user = await User.findOne(
      {
        $or: [{ email: loggToken }, { userName: loggToken }],
      },
      {
        userName: 1,
        email: 1,
        name: 1,
        isVerified: 1,
        password: 1,
        _id: 1,
      }
    );
    if (!user) {
      next(createError(401, "Authentication failed!"));
    }

    const passwordMatched = bcrypt.compareSync(password, user.password);
    if (!passwordMatched) {
      next(createError(401, "Authentication failed!"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("accessKey", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
      httpOnly: false,
      sameSite: "Lax",
    });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("accessKey");
    res.status(200).json({ message: "Logout successfuly" });
  } catch (error) {
    next();
  }
};

export const protectedUser = async (req, res, next) => {
  try {
    const { accessKey } = req.cookies;
    if (!accessKey) {
      next(createError(400, "Access key not found"));
    }

    const decoded = jwt.verify(accessKey, process.env.JWT_SECRET);
    if (!decoded) next(createError(401, "authentication failed"));

    const user = await User.findById(decoded.id, {
      _id: 1,
      userName: 1,
      email: 1,
      name: 1,
      isVerified: 1,
      blockList: 1,
    });

    if (!user) next(createError(401, "authentication failed"));

    return res.status(200).json({ message: "Token verified", payload: user });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(createError(401, "authentication failed"));
    }
    next(error);
  }
};
