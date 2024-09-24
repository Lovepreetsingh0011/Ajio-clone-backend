import { Seller } from "../Model/Seller.Model.js";
import nodemailer from "nodemailer";
import { User } from "../Model/User.Model.js";
import { Admin } from "../Model/Admin.Model.js";
import jwt from "jsonwebtoken";
// Create
const Create_controler = async (req, res) => {
  try {
    const {
      ShopName,
      OwnerName,
      ShopType,
      City,
      State,
      PinCode,
      ShopEmail,
      ShopLocation,
      Ph,
    } = req.body;

    if (
      [
        ShopName,
        OwnerName,
        ShopType,
        City,
        State,
        PinCode,
        ShopEmail,
        ShopLocation,
        Ph,
      ].some((values) => !values || values.trim() == "")
    ) {
      return res.status(404).json({
        msg: "All Fields is Required",
        success: false,
      });
    }

    // const exitsemail = await User.findOne({ Email: ShopEmail });
    // if (exitsemail) {
    //   return res.status(404).json({
    //     msg: "This Email is Already  in Used",
    //     success: false,
    //   });
    // }
    const exitsemail2 = await Seller.findOne({ Email: ShopEmail });
    if (exitsemail2) {
      return res.status(404).json({
        msg: "This Email is Already  in Used",
        success: false,
      });
    }
    // const exitsemail3 = await Admin.findOne({ AdminEmail: ShopEmail });
    // if (exitsemail3) {
    //   return res.status(404).json({
    //     msg: "This Email is Already  in Used",
    //     success: false,
    //   });
    // }
    // Create
    const data = await Seller.create({
      ShopName,
      OwnerName,
      ShopType,
      City,
      State,
      PinCode,
      ShopEmail,
      Ph,
      ShopLocation,
      Userid: req.user,
    });

    if (!data) {
      return res.status(404).json({
        msg: "Error occur will create the Seller",
        success: false,
      });
    }
    // For Verification The Seller
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: "lovepreetsin9292@gmail.com",
        pass: "gwel hbha gjpr omub ",
      },
    });

    const info = await transporter.sendMail({
      from: '"Lovepreet singh 👻" <lovepreetsin9264@gmail.com>', // sender address
      // to: `${user.email}`, // list of receivers
      to: `${data.ShopEmail}`,
      subject: "Verification", // Subject line
      text: " I have see you submit a request for seller account,if you really interested then call our Customer Number For Verification:6283109264. contact as soon as possible ", // plain text body
      //   html: "<b>Hello world?</b>", // html body
    });

    // Return Statement
    return res.status(200).json({
      msg: "Your Request has been Submitted Our Team Will inform you in Short Time In your Email Address",
      success: true,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Create   Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
// Login OTP
const Seller_LoginOTP = async (req, res) => {
  const { ShopEmail } = req.body;

  try {
    if (!ShopEmail || ShopEmail.trim() == "") {
      return res.status(404).json({
        msg: "ShopEmail is required",
        success: false,
      });
    }

    // Email Validation
    const data = await Seller.findOne({ ShopEmail });
    if (!data) {
      return res.status(404).json({
        msg: "Invalid Email",
        success: false,
      });
    }

    if (data.Role == "User") {
      return res.status(404).json({
        msg: " AunAuthorized Access",
        success: false,
      });
    }

    // ******************************************************
    const OTP = Math.floor(Math.random() * 10000).toString();

    const transporter = await nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: "lovepreetsin9292@gmail.com",
        pass: "gwel hbha gjpr omub ",
      },
    });

    const info = await transporter.sendMail({
      from: '"Lovepreet singh 👻" <lovepreetsin9264@gmail.com>', // sender address
      // to: `${user.email}`, // list of receivers
      to: `${data.ShopEmail}`,
      subject: "Your OTP For Login TO Seller Acccount", // Subject line
      text: OTP, // plain text body
      //   html: "<b>Hello world?</b>", // html body
    });
    data.OTP = OTP;
    data.save();

    // Return Stament
    return res.status(200).json({
      msg: " OTP send Successfully",
      success: true,
      Email: data.Email,
    });
  } catch (error) {
    return res.status(404).json({
      msg: " Error Occur in Seller Login OTP Controler",
      success: false,
      errormsg: error.message,
    });
  }
};

// Login Check OTP
const LoginCheck_OTP = async (req, res) => {
  const { OTP, ShopEmail } = req.body;

  try {
    if (!OTP || OTP.trim() == "") {
      return res.status(404).json({
        msg: "OTP is Requires",
        success: false,
      });
    }
    if (!ShopEmail || ShopEmail == "") {
      return res.status(500).json({
        msg: "ShopEmail is Required",
        success: false,
      });
    }

    // Find The User Object by Email
    const user = await Seller.findOne({ ShopEmail });
    if (!user) {
      return res.status(500).json({
        msg: "internal server error cant find email",
        success: false,
      });
    }
    // Check The OTP

    if (user.OTP != OTP) {
      return res.status(404).json({
        msg: " Invalid OTP Please check another Time",
        success: false,
      });
    }
    // Set Cookie
    var option = {
      secure: false,
      maxAge: 90000000,
      httpOnly: false,
    };
    const SellerToken = jwt.sign({ _id: user._id }, "lovepreet");
    // Clear The OTP
    user.OTP = "";
    user.save();
    return res
      .cookie("SellerToken", SellerToken, option)
      .status(200)
      .json({
        msg: `${user.OwnerName} Login Successfully`,
        success: true,
        Seller: {
          user,
          success: true,
        },
      });
  } catch (error) {
    return res.status(404).json({
      msg: "error Occur in Login Check OTP  Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
// Logout Seller controler
const Logout_controler = async (req, res) => {
  try {
    res.clearCookie("SellerToken");
    return res.status(200).json({
      msg: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Logout controler",
      success: false,
      errormsg: error.message,
    });
  }
};

// Update
const Update_controler = async (req, res) => {
  try {
    const {
      ShopName,
      OwnerName,
      ShopType,
      City,
      State,
      PinCode,
      ShopEmail,
      ShopLocation,
      Ph,
    } = req.body;

    if (
      [
        ShopName,
        OwnerName,
        ShopType,
        City,
        State,
        PinCode,
        ShopEmail,
        ShopLocation,
        Ph,
      ].some((values) => values.trim() == "")
    ) {
      return res.status(404).json({
        msg: "All Fields is Required",
        success: false,
      });
    }

    // Create
    const data = await Seller.findByIdAndUpdate(
      { _id: req.seller },
      {
        ShopName,
        OwnerName,
        ShopType,
        City,
        State,
        PinCode,
        ShopEmail,
        ShopLocation,
        Ph,
      }
    );

    if (!data) {
      return res.status(404).json({
        msg: "Error occur will Update the Seller",
        success: false,
      });
    }

    // Return Statement
    return res.status(200).json({
      msg: "Seller Update Succesfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in update   Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
const Get_Seller = async (req, res) => {
  try {
    const id = req.seller;
    if (!id || id == "") {
      return res.status(404).json({
        msg: "Id is Required",
        success: false,
      });
    }

    const data = await Seller.findById(id);
    if (!data) {
      return res.status(404).json({
        msg: "cant find ",
        success: false,
      });
    }

    // Return statement
    return res.status(200).json({
      msg: "successfully find  seller",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get  Seller controler",
      success: false,
      error: error.message,
    });
  }
};

export {
  Create_controler,
  Seller_LoginOTP,
  LoginCheck_OTP,
  Update_controler,
  Logout_controler,
  Get_Seller,
};
