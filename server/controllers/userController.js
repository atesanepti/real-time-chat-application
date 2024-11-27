import createError from "http-errors";

import User from "../models/userModel.js";
import { sendCode } from "./../helper/otp.js";
import { deleteImage } from "../utils/deleteImage.js";
import { sendEmail } from "../helper/email.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res, next) => {
  try {
    const { name, userName, email, password } = req.body;

    const payload = {
      name,
      userName,
      email,
      password,
    };
    if (req.file) {
      payload.image = `${process.env.SERVER}/upload/${req.file.filename}`;
    }
    const user = await User.create(payload);

    const code = await sendCode(5, user._id);

    await sendEmail({
      to: user.email,
      from: "epti060@gmail.com",
      subject: "Account Verification",
      html: `<h3>Hi ${user.name}, </h3> <br> <p>Your Verification Code - <b>${code}</b></p>`,
    });

    return res
      .status(201)
      .json({ message: "user created", payload: user, otp: code });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const { search, page } = {
      search: req.query.search || "",
      page: req.query.page || 1,
    };

    if (search == "") {
      return res.status(200).json([]);
    }

    const match = new RegExp(".*" + search + ".*", "gi");

    const queries = {
      email: { $ne: req.user.email },
      isVerified: true,
      $or: [
        {
          email: { $regex: match },
        },
        {
          userName: { $regex: match },
        },
        {
          name: { $regex: match },
        },
      ],
    };

    const users = await User.find(queries, {
      name: 1,
      userName: 1,
      email: 1,
      image: 1,
      _id: 1,
    })
      .limit(7 * page)
      .lean();

    const myBlockListId = req.user.blockList?.map((u) => u._id.toString());

    const filterdUsers = users.filter(
      (u) => !myBlockListId?.includes(u._id.toString())
    );

    return res.status(200).json(filterdUsers);
  } catch (error) {
    next(error);
  }
};

export const findUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, {
      name: 1,
      email: 1,
      userName: 1,
      image: 1,
      blockList: 1,
    }).lean();
    if (!user) {
      next(createError(404, "User not found!"));
    }

    let isBlock;

    if (user.blockList || user.blockList?.length > 0) {
      isBlock = user.blockList.filter((b) => b._id == req.user_id);
    }
    user.isBlock = isBlock.length == 0 ? false : true;

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const findMine = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id, { password: 0, _v: 0, otp: 0 });
    if (!user) next(createError(404, "User not found"));

    return res.status(200).json({ message: "User Found", payload: user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const payload = {};
    for (let key in req.body) {
      if (req.body[key] !== "password" || req.body[key] !== "email") {
        payload[key] = req.body[key];
      }
    }
    if (req.file) {
      let user = await User.findById(req.user._id);
      if (!user) {
        next(createError(404, "user not found!"));
      }
      deleteImage(user.image);

      payload.image = `${process.env.SERVER}/upload/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, payload, {
      new: true,
      projection: { name: 1, userName: 1, email: 1, _id: 1, isVerified: 1 },
    });
    if (!updatedUser) {
      next(createError(404, "user not found!"));
    }

    return res
      .status(200)
      .json({ message: "user updated", payload: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user._id, {
      prejection: { password: 0, otp: 0 },
    });
    if (deletedUser.image) {
      deleteImage(deletedUser.image);
    }

    res.clearCookie("accessKey");

    return res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};

export const userVerify = async (req, res, next) => {
  try {
    const { code, userId } = req.body;
    if (!code) {
      next(createError(400, "Verification code not found!"));
    }

    const user = await User.findById(userId);
    if (!user) {
      next(createError(404, "User not found!"));
    }
    if (user.otp == code) {
      user.isVerified = true;
      user.otp = null;
      await user.save();
      res.status(200).json({ message: "Verified" });
    }

    res.status(400).json({ message: "Wrong OTP!" });
  } catch (error) {
    next(error);
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email }, { _id: 1, email: 1, name: 1 });
    if (!user) {
      next(createError(404, "User not found with this id"));
    }

    const code = await sendCode(5, user._id);

    await sendEmail({
      from: "epti060@gmail.com",
      to: user.email,
      subject: "Forget Password",
      html: `<h3>Hi ${user.name},</h3> <br> <p> OTP - <b>${code}</b> </p>`,
    });

    return res
      .status(200)
      .json({ message: "OTP sent", code: code, payload: user });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password },
      { new: true, projection: { password: 0, otp: 0 } }
    );
    res.status(200).json({ payload: updatedUser, message: "Password changed" });
  } catch (error) {
    next(error);
  }
};
export const otpVerify = async (req, res, next) => {
  try {
    const { code, userId } = req.body;
    if (!code) {
      next(createError(400, "OTP not found!"));
    }

    const user = await User.findById(userId);
    if (!user) next(createError(404, "User not found with this id"));

    if (user.otp != code) {
      next(createError(401, "Wrong otp"));
    }
    return res.status(200).json({ message: "Verified" });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, password } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) next(createError(404, "User not found"));

    const oldPasswordMatch = bcrypt.compareSync(oldPassword, user.password);
    if (!oldPasswordMatch) next(createError(400, "Current password wrong!"));

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { password },
      { new: true, runValidators: true, projection: { password: 0 } }
    );
    if (!updateUser) next(createError(404, "User not found"));

    return res
      .status(201)
      .json({ message: "password changed", payload: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const setBio = async (req, res, next) => {
  try {
    const { bio } = req.body;

    if (!bio) next(createError(400, "Bio is Empty"));

    const user = await User.findById(req.user._id);
    if (!user) next(createError(404, "User not found"));

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { bio },
      { new: true, runValidators: true, projection: { password: 0 } }
    );
    if (!updateUser) next(createError(404, "User not found"));

    return res
      .status(201)
      .json({ message: "bio created", payload: updatedUser });
  } catch (error) {
    next(error);
  }
};
