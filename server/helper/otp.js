import User from "../models/userModel.js";
import { sendEmail } from "./email.js";

const genCodes = (digit) => {
  let codes = [];
  for (let i = 0; i < digit; i++) {
    const randomNum = Math.round(Math.random() * 9);
    codes[i] = randomNum;
  }
  codes = +codes.join("");

  return codes;
};

export const sendCode = async (length, userId) => {
  const code = genCodes(length);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { otp: code },
      { new: true }
    );

    return code;
  } catch (error) {
    throw error;
  }
};
