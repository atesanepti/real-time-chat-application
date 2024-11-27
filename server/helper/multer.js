import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,path.join(path.resolve() + "/upload"));
  },
  filename: (req, file, cb) => {
    let fileName =
      file.originalname.replace(path.extname(file.originalname), "") +
      Date.now() +
      path.extname(file.originalname);
    fileName = fileName.replace(/ /g, "");
    cb(null, fileName);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const acceptFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (acceptFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only jpg or png file will be accepted"));
    }
  },
});

