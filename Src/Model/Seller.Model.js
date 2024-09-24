import mongoose from "mongoose";
const Sellerschema = new mongoose.Schema(
  {
    ShopName: {
      type: String,
      required: true,
    },
    OwnerName: {
      type: String,
      required: true,
    },
    ShopType: {
      type: String,
      required: true,
      enum: ["Clothes", "Shoes", "Bags", "Goggles", "Ecommerce"],
    },
    ShopLocation: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    State: {
      type: String,
      required: true,
    },
    PinCode: {
      type: String,
      required: true,
    },
    ShopEmail: {
      type: String,
      required: true,
    },
    Ph: {
      type: String,
      required: true,
    },
    Userid: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    OTP: {
      type: String,
    },
    Role: {
      type: String,
      required: true,
      enum: ["User", "Seller"],
      default: "User",
    },
  },
  { timestamps: true }
);

export const Seller = mongoose.model("Seller", Sellerschema);
