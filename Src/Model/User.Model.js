import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is required"],
    },
    Email: {
      type: String,
      required: [true, "Email is required"],
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
    Role: {
      type: String,

      default: "User",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
