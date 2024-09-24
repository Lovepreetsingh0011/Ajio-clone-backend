import mongoose from "mongoose";
import { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    Name: {
      type: String,
      required: [true, "Product Name is required"],
    },
    slug: {
      type: String,
    },
    Image: {
      type: String,
      required: [true, "Product Image is Required"],
    },
    Image1: {
      type: String,
    },
    Image2: {
      type: String,
    },
    Image3: {
      type: String,
    },
    Image4: {
      type: String,
    },
    Userid: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    SellerId: {
      type: mongoose.Types.ObjectId,
      ref: "Seller",
    },
    Category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: [true, "Product catgory is Required"],
    },
    SubCategory: {
      type: mongoose.Types.ObjectId,
      ref: "Subcategory",
      required: [true, "Product SubCategory is Required"],
    },
    ChildSubCategory: {
      type: mongoose.Types.ObjectId,
      ref: "ChildSubcategory",
      required: true,
    },

    ProductType: {
      type: String,
      required: true,
    },
    MFD: {
      type: String,
      required: true,
    },
    MFB: {
      type: String,
      required: true,
    },
    CompanyName: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: [true, "Product Price is Required"],
    },
    OfferPercentage: {
      type: String,
      required: true,
    },
    Offerid: {
      type: mongoose.Types.ObjectId,
      ref: "Offer",
      required: [true, "Product offerId is Required"],
    },
    FinalPrice: {
      type: String,
    },
    ProductDetails: [{ type: String }],
    Description: {
      type: String,
      required: [true, "Product Description is Required"],
    },
    Title: {
      type: String,
      required: [true, "Product Description is Required"],
    },

    Quantity: {
      type: String,
      required: [true, "Product Quantity is Required"],
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
