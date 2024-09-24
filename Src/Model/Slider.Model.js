import mongoose from "mongoose";
const sliderSchema = new mongoose.Schema(
  {
    SliderName: {
      type: String,
      required: true,
    },
    Slug: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    SliderNo: {
      type: Number,
      required: true,
    },
    Image: {
      type: String,
      required: true,
    },
    AddedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: [true, "Product Category is Required"],
    },
    Sub_category: {
      type: mongoose.Types.ObjectId,
      ref: "Subcategory",
      required: [true, "Product SubCategory is Required"],
    },
    Sub_category_Age: {
      type: mongoose.Types.ObjectId,
      ref: "Subcategory_age",
      required: true,
    },
  },
  { timestamps: true }
);

export const Slider = mongoose.model("Slider", sliderSchema);
