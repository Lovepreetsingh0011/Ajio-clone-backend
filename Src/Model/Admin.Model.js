import mongoose from "mongoose";
import { Schema } from "mongoose";

const AdminSchema = new Schema(
  {
    AdminName: {
      type: String,
      required: [true, "Name is required"],
    },
    AdminEmail: {
      type: String,
      required: [true, "Email is required"],
    },
    Designation: {
      type: String,
      required: true,
    },
    Branch: {
      type: String,
      required: true,
    },
    Ph: {
      type: String,
      required: [true, "Phone Number is required"],
    },
    Gender: {
      type: String,
      enum: ["Male", "Female"],
      required: [true, "Gender is required"],
    },
    Address: {
      type: String,
    },
    OTP: {
      type: String,
      default: "",
    },
    Userid: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    Role: {
      type: String,
      default: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", AdminSchema);
