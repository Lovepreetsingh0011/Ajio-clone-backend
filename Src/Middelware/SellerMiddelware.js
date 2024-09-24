import { Seller } from "../Model/Seller.Model.js";
import { User } from "../Model/User.Model.js";
import { Admin } from "../Model/Admin.Model.js";
import jwt from "jsonwebtoken";
const SellerMiddelware = async (req, res, next) => {
  try {
    const sellerdata = req.cookies.SellerToken;
    const admindata = req.cookies.AdminToken;

    if (!sellerdata && !admindata) {
      return res.status(404).json({
        msg: "Login  Required",
        success: false,
      });
    }

    // if Seller token
    if (sellerdata) {
      const sellertoken = await jwt.verify(sellerdata, "lovepreet");

      if (!sellertoken) {
        return res.status(404).json({
          msg: "Invalid  Token",
          success: false,
        });
      }
      const user = await Seller.findById(sellertoken._id);

      if (!user) {
        return res.status(404).json({
          msg: "UnAuthorized Seller",
          success: false,
        });
      }
      req.seller = user._id;
      next();
    }

    // // If admin token
    if (admindata) {
      const admintoken = await jwt.verify(admindata, "lovepreet");

      if (!admintoken) {
        return res.status(404).json({
          msg: "Invalid  Token",
          success: false,
        });
      }
      const user = await Admin.findById(admintoken._id);
      if (!user) {
        return res.status(404).json({
          msg: "UnAuthorized Admin ",
          success: false,
        });
      }
      next();
    }
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Seller Middelware",
      success: false,
    });
  }
};

export { SellerMiddelware };
