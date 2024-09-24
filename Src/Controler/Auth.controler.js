import { User } from "../Model/User.Model.js";
import nodemailer from "nodemailer";

import jwt from "jsonwebtoken";
// Register Controler
const Register_controler = async (req, res) => {
  const { Name, Email, Ph, Gender, Address } = req.body;

  try {
    // Input Fields Validations
    if (
      [Name, Email, Ph, Gender, Address].some(
        (value) => !value || value.trim() == ""
      )
    ) {
      return res.status(404).json({
        msg: "All inputs fields data are required",
        success: false,
      });
    }
    // Email check
    const exit = await User.findOne({ Email });
    if (exit) {
      return res.status(404).json({
        msg: "This Email Is Already Exits",
        success: false,
      });
    }

    // Create User
    const user = await User.create({
      Name,
      Email,
      Ph,
      Gender,
      Address,
    });
    // If error occur
    if (!user) {
      return res.status(500).json({
        msg: " User Cant Create  ",
        success: false,
      });
    }
    //  Return Statement
    return res.status(200).json({
      success: true,
      msg: "User Successfully Create",
      user,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "Error occur in Register Controler",
      errormsg: error.message,
    });
  }
};

// Login OTP Controler

const Login_OTP_Controler = async (req, res) => {
  const { Email } = req.body;

  try {
    if (!Email || Email.trim() == "") {
      return res.status(404).json({
        msg: "email is required",
        success: false,
      });
    }

    // Email Validation
    const data = await User.findOne({ Email });
    if (!data) {
      return res.status(404).json({
        msg: "Invalid Email",
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
      to: `${data.Email}`,
      subject: "One Time Password", // Subject line
      text: OTP, // plain text body
      //   html: "<b>Hello world?</b>", // html body
    });
    console.log("OTP is send", info.messageId);
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
      msg: " Error Occur in Login Controler",
      success: false,
      errormsg: error.message,
    });
  }
};

// Login Check OTP
const Login_Check_OTP_Controler = async (req, res) => {
  const { OTP, Email } = req.body;

  try {
    if (!OTP || OTP.trim() == "") {
      return res.status(404).json({
        msg: "OTP is Requires",
        success: false,
      });
    }
    if (!Email || Email == "") {
      return res.status(500).json({
        msg: "Email is Required",
        success: false,
      });
    }

    // Find The User Object by Email
    const user = await User.findOne({ Email });
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
    const Token = jwt.sign({ _id: user._id }, "lovepreet");
    // Clear The OTP
    user.OTP = "";
    user.save();
    return res
      .cookie("Token", Token, option)
      .status(200)
      .json({
        msg: "User Login Successfully",
        success: true,
        user: {
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

// Update Details
const Update_details_controler = async (req, res) => {
  const { Name, Email, Ph, Gender, Address } = req.body;
  const _id = req.user;

  try {
    if (
      [Name, Ph, Gender, Address].some((value) => !value || value.trim() == "")
    ) {
      return res.status(404).json({
        msg: "All inputs fields data are required",
        success: false,
      });
    }

    // Find the user Object

    const user = await User.findByIdAndUpdate(
      _id,
      {
        Name,
        Address,
        Ph,
        Gender,
      },
      { new: true }
    );

    if (!user) {
      return res.status(500).json({
        msg: "error occur will update user details",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "Update Details Successfully",
      success: true,
      user: {
        Name: user.Name,
        Ph: user.Ph,
        Gender: user.Gender,
        Address: Address,
      },
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error Occur in Update Details controler",
      success: false,
    });
  }
};

// Logout controler
const Logout_controler = async (req, res) => {
  try {
    res.clearCookie("Token");
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

// // Update Email
// const Update_Email_controler=async(req,res)=>{
//     const { Name, NewEmail, Ph,   } = req.body;
//     const _id = req.user;

//     try {
//       if (
//         [Name, Ph, Gender, Address].some((value) => !value || value.trim() == "")
//       ) {
//         return res.status(404).json({
//           msg: "All inputs fields data are required",
//           success: false,
//         });
//       }

//       // Find the user Object

//       const user = await User.findByIdAndUpdate(_id, {
//         Name,
//         Address,
//         Ph,
//         Gender,
//       });

//       if (!user) {
//         return res.status(500).json({
//           msg: "error occur will update user details",
//           success: false,
//         });
//       }

//       return res.status(200).json({
//         msg: "Update Details Successfully",
//         success: true,
//         user: {
//           Name: user.Name,
//           Ph: user.Ph,
//           Gender: user.Gender,
//           Address: Address,
//         },
//       });
//     } catch (error) {
//       return res.status(404).json({
//         msg: "error Occur in Update Details controler",
//         success: false,
//       });
//     }
// }

// Pending
export {
  Register_controler,
  Login_OTP_Controler,
  Login_Check_OTP_Controler,
  Update_details_controler,
  Logout_controler,
};
