// import { apnaValidator } from "./validator.js";
import User from './../models/userModel.js';
import createError from "http-errors"
// export const userValidate = (body) => {
//   apnaValidator(body, [
//     {
//       field: "name",
//       validateWith: [{ validate : "required", message : "name is requi"}, { min: 4 }, { max: 20 }, "alpabet", "trim"],
//     },
//     {
//       field: "userName",
//       validateWith: ["required", { min: 4 }, { max: 50 }, "trim"],
//     },
//     {
//       field: "email",
//       validateWith: ["required", { min: 15 }, "email", "trim"],
//     },
//   ]);
// };

export const userValidation = async(req, res, next) => {
  try {
    const { name, userName, email, password } = req.body;

    if (!name) {
      return next(401, "name is required!");
    }
    if (!userName) {
      returnnext(401, "userName is required!");
    }
    if (!email) {
      return next(401, "email is required!");
    }
    if (!password) {
      return next(401, "password is required!");
    }

    if (req.file) {
      if (req.file.size > 1024 * 1024) {
        return next(createError(400, "maximum file size 1mb"));
      }
    }
    
    const user = await User.findOne({$or : [{email}, {userName}]})
    if(user){
      return next(createError(400, "User already Exist"))
    }

    next();
  } catch (error) {
    next(error);
  }
};
