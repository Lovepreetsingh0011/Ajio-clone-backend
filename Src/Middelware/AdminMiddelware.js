import jwt from "jsonwebtoken";
import { Admin } from "../Model/Admin.Model.js";
const AdminMiddelware = async (req, res, next) => {
  try {
    const data = req.cookies.AdminToken;
    if (!data) {
      return res.status(404).json({
        msg: "Admin Login Required",
        success: false,
      });
    }
    const token = await jwt.verify(data, "lovepreet");
    if (!token) {
      return res.status(404).json({
        msg: "Invalid Admin Token",
        success: false,
      });
    }
    const user = await Admin.findById(token._id);
    if (!user) {
      return res.status(404).json({
        msg: "UnAuthorized Access",
        success: false,
      });
    }

    req.admin = user._id;
    next();
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Admin Middelware",
      success: false,
    });
  }
};

export { AdminMiddelware };
