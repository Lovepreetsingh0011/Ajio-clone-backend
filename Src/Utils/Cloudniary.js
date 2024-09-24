import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// Configuration
cloudinary.config({
  cloud_name: "dlswmuuka",
  api_key: "669243533261796",
  api_secret: "Z3nyFWJg0ARHCrhn6dUhU2nadvU", // Click 'View Credentials' below to copy your API secret
});
export const Uploadcloud = async (localpath) => {
  // Upload an image
  try {
    const uploadResult = await cloudinary.uploader.upload(localpath);
    if (!uploadResult) {
      fs.unlinkSync(localpath);
      return undefined;
    }
    fs.unlinkSync(localpath);
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localpath);

    console.log("error occur in cloundniary file");
  }
};
