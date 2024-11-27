import fs from "fs";
import path from "path";

export const deleteImage = (imageLink) => {
  let imagePath = imageLink.split("/");
  imagePath = imagePath[imagePath.length - 1];

  try {
    fs.unlinkSync(path.join(path.resolve() + `/upload/${imagePath}`));
    console.log("Image deleted");
  } catch (error) {
    throw error;
  }
};
