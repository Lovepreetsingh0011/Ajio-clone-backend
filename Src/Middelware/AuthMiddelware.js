import jwt from "jsonwebtoken";
import { User } from "../Model/User.Model.js";

const AuthMiddelware = async (req, res, next) => {
  try {
    const data = req.cookies.Token;
    if (!data) {
      return res.status(404).json({
        msg: "Login Required ||",
        success: false,
      });
    }
    const token = await jwt.verify(data, "lovepreet");
    if (!token) {
      return res.status(404).json({
        msg: "Invalid Token",
        success: false,
      });
    }
    const user = await User.findById(token._id);
    if (!user) {
      return res.status(404).json({
        msg: "UnAuthorized User",
        success: false,
      });
    }
    if (user.Role == "User") {
      req.user = user._id;
      next();
    } else {
      return res.status(404).json({
        msg: "UnAuthorized User",
        success: false,
      });
    }
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Middelware",
      success: false,
    });
  }
};
export { AuthMiddelware };
