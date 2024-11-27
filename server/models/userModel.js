import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

console.log(process.env.SERVER);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 20,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 4,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 15,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      set: (value) => {
        const password = bcrypt.hashSync(value, 10);
        return password;
      },
    },
    image: {
      type: String,
      default: `http://localhost:3000/upload/default-profile.jpg`,
    },
    bio: {
      type: String,
      maxlength: 300,
      default: "",
    },
    blockList: [{ type: Schema.Types.ObjectId, ref: "user" }],
    otp: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

const User = new model("user", userSchema);
export default User;
