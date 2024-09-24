import { Admin } from "../Model/Admin.Model.js";
import { Seller } from "../Model/Seller.Model.js";
import { User } from "../Model/User.Model.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// Register Admin Controler
const Admin_Register = async (req, res) => {
  const {
    AdminName,
    AdminEmail,
    Designation,
    Branch,
    Ph,
    Gender,
    Address,
    Userid,
  } = req.body;

  try {
    // Input Fields Validations
    if (
      [
        AdminName,
        AdminEmail,
        Designation,
        Branch,
        Ph,
        Gender,
        Address,
        Userid,
      ].some((value) => !value || value.trim() == "")
    ) {
      return res.status(404).json({
        msg: "All inputs fields data are required",
        success: false,
      });
    }
    // Email check
    const exit = await User.findOne({ Email: AdminEmail });
    if (exit) {
      return res.status(404).json({
        msg: "This Email Is Already Exits in User Database",
        success: false,
      });
    }
    const exit2 = await Seller.findOne({ ShopEmail: AdminEmail });
    if (exit2) {
      return res.status(404).json({
        msg: "This Email Is Already Exits Seller Database",
        success: false,
      });
    }
    const exit3 = await Admin.findOne({ AdminEmail: AdminEmail });
    if (exit3) {
      return res.status(404).json({
        msg: "This Email Is Already Exits Admin Database",
        success: false,
      });
    }

    // Create User
    const user = await Admin.create({
      AdminName,
      AdminEmail,
      Designation,
      Branch,
      Ph,
      Gender,
      Address,
      Userid,
    });
    // If error occur
    if (!user) {
      return res.status(500).json({
        msg: " Admin Cant Create  ",
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
      to: `${user.AdminEmail}`,
      subject: "Verification", // Subject line
      text: " I have see you submit a request for Admin account,if you really interested then call This  Customer Care Number For Verification:6283109264. contact as soon as possible ", // plain text body
      //   html: "<b>Hello world?</b>", // html body
    });

    //  Return Statement
    return res.status(200).json({
      success: true,
      msg: "Your Request Has Been Submited Succesfully please check Our Email for futher Information ",
    });
  } catch (error) {
    return res.status(404).json({
      msg: "Error occur in Register Controler",
      errormsg: error.message,
    });
  }
};

// Login OTP
const Admin_LoginOTP = async (req, res) => {
  const { AdminEmail } = req.body;

  try {
    if (!AdminEmail || AdminEmail.trim() == "") {
      return res.status(404).json({
        msg: "AdminEmail is required",
        success: false,
      });
    }

    // Email Validation
    const data = await Admin.findOne({ AdminEmail });
    if (!data) {
      return res.status(404).json({
        msg: "Invalid Email",
        success: false,
      });
    }

    if (data.Role == "User" || data.Role == "Seller") {
      return res.status(404).json({
        msg: "Aunautorized Access Please Check your role",
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
      from: '"Lovepreet singh 👻" <lovepreetsin9292@gmail.com>', // sender address
      // to: `${user.email}`, // list of receivers
      to: `${data.AdminEmail}`,
      subject: "Your OTP For Login TO Admin Acccount", // Subject line
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
      msg: " Error Occur in Admin Login Controler",
      success: false,
      error,
      errormsg: error.message,
    });
  }
};

// Login Check OTP
const LoginCheck_OTP = async (req, res) => {
  const { OTP, AdminEmail } = req.body;

  try {
    if (!OTP || OTP.trim() == "") {
      return res.status(404).json({
        msg: "OTP is Requires",
        success: false,
      });
    }
    if (!AdminEmail || AdminEmail == "") {
      return res.status(500).json({
        msg: "AdminEmail is Required",
        success: false,
      });
    }

    // Find The User Object by Email
    const user = await Admin.findOne({ AdminEmail });
    if (!user) {
      return res.status(500).json({
        msg: "error occur cant find This Email ",
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
    const AdminToken = jwt.sign({ _id: user._id }, "lovepreet");
    // Clear The OTP
    user.OTP = "";
    user.save();
    return res
      .cookie("AdminToken", AdminToken, option)
      .status(200)
      .json({
        msg: `${user.AdminName} Login Successfully`,
        success: true,
        Admin: {
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

// Update Admin Details
const Update_Admin_details = async (req, res) => {
  try {
    const _id = req.admin;
    const { AdminName, AdminEmail, Designation, Branch, Ph, Gender, Address } =
      req.body;

    if (
      [AdminName, AdminEmail, Designation, Branch, Ph, Gender, Address].some(
        (value) => !value || value.trim() == ""
      )
    ) {
      return res.status(404).json({
        msg: "All inputs fields  are required",
        success: false,
      });
    }

    // Find the user Object

    const user = await Admin.findByIdAndUpdate(
      _id,
      {
        AdminName,
        AdminEmail,
        Designation,
        Branch,
        Ph,
        Gender,
        Address,
      },
      { new: true }
    );

    if (!user) {
      return res.status(500).json({
        msg: "error occur will update Admin details",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "Update Details Successfully",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error Occur in Update Details controler",
      success: false,
    });
  }
};

// Logout Admin controler
const Logout_controler = async (req, res) => {
  try {
    res.clearCookie("AdminToken");
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

// //////////////////////////////////////////////////////////////////////////////////////////////////
// FOR USER

// Get All Users

const GetAllUsers = async (req, res) => {
  try {
    const data = await User.find();
    if (!data) {
      return res.status(404).json({
        msg: "Error occur will find users",
        success: false,
      });
    }
    return res.status(200).json({
      msg: "Users Found Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Admin Find All User controler",
      success: false,
      errormsg: error.message,
    });
  }
};

// Get Single User With Email

const Get_User_withEmail = async (req, res) => {
  try {
    const { Email } = req.params;
    if (!Email || Email == "") {
      return res.status(404).json({
        msg: " Email is Required",
        success: false,
      });
    }
    const data = await User.findOne({ Email });

    if (!data || data == "") {
      return res.status(404).json({
        msg: "  This User is Not Found In Database",
        success: false,
      });
    }
    return res.status(200).json({
      msg: "Successfully Found  User",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get  User   Controler",
      success: false,
      errormsg: error.message,
    });
  }
};

// Get User With Id
const Get_User_withid = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " id is Required",
        success: false,
      });
    }
    const data = await User.findById(id);

    if (!data || data == "") {
      return res.status(404).json({
        msg: "  This User is Not Found In Database",
        success: false,
      });
    }
    return res.status(200).json({
      msg: "Successfully Found  User",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get  User   Controler",
      success: false,
      errormsg: error.message,
    });
  }
};

// Delete User
const Delete_User = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " is is Required",
        success: false,
      });
    }
    const data = await User.findByIdAndDelete(id);

    if (!data || data == "") {
      return res.status(404).json({
        msg: "  Error ocuur will delete User",
        success: false,
      });
    }
    return res.status(200).json({
      msg: "Successfully Delete  User",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in delete  User   Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FOR SELLER

// Chnage Role Of Seller
const ChangeRole_of_Seller = async (req, res) => {
  try {
    const { id, Role } = req.body;
    if (!id || id == "") {
      return res.status(404).json({
        msg: "Id is required",
        success: false,
      });
    }
    if (!Role || Role == "") {
      return res.status(404).json({
        msg: "Role is required",
        success: false,
      });
    }

    const data = await Seller.findByIdAndUpdate(
      { _id: id },
      {
        Role: Role,
      },
      {
        new: true,
      }
    );
    if (!data) {
      return res.status(404).json({
        msg: "Error ocuur will change seller Role ",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "Role Change Succesfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Change Role Of Seller  Controler",
      success: false,
      errormsg: error.message,
    });
  }
};

// Get All Seller
const GetAll_Seller = async (req, res) => {
  try {
    const data = await Seller.find().populate("Userid");

    return res.status(200).json({
      msg: "Successfully Found All Sellers",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get All Seller   Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
// Get Single Seller With Email

const Get_Seller_withEmail = async (req, res) => {
  try {
    const { Email } = req.params;
    if (!Email || Email == "") {
      return res.status(404).json({
        msg: " Email is Required",
        success: false,
      });
    }
    const data = await Seller.findOne({ ShopEmail: Email }).populate("Userid");

    if (!data || data == "") {
      return res.status(404).json({
        msg: "  This Seller is Not Found In Database",
        success: false,
      });
    }
    return res.status(200).json({
      msg: "Successfully Found  Sellers",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get  Seller   Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
// Get Single Seller with TokenNo

const Get_Seller_withid = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " id is Required",
        success: false,
      });
    }
    const data = await Seller.findById(id).populate("Userid");

    if (!data || data == "") {
      return res.status(404).json({
        msg: "  This Seller is Not Found In Database",
        success: false,
      });
    }
    return res.status(200).json({
      msg: "Successfully Found  Seller",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get  Seller   Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
// Delete Seller
const Delete_Seller = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " is is Required",
        success: false,
      });
    }
    const data = await Seller.findByIdAndDelete(id);

    if (!data || data == "") {
      return res.status(404).json({
        msg: "  Error ocuur will delete seller",
        success: false,
      });
    }
    return res.status(200).json({
      msg: "Successfully Delete  Sellers",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in delete  Seller   Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
export {
  ChangeRole_of_Seller,
  Admin_Register,
  Admin_LoginOTP,
  LoginCheck_OTP,
  Update_Admin_details,
  Logout_controler,
  GetAllUsers,
  GetAll_Seller,
  Get_Seller_withEmail,
  Get_Seller_withid,
  Delete_Seller,
  Get_User_withEmail,
  Get_User_withid,
  Delete_User,
};
