import mongoose from "mongoose";
import { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    Name: {
      type: String,
      required: [true, "Category Name is Required"],
    },
    Slug: {
      type: String,
    },

    SubCategory: [{ type: mongoose.Types.ObjectId, ref: "Subcategory" }],

    ChildSubCategory: {
      type: mongoose.Types.ObjectId,
      ref: "ChildSubcategory",
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", CategorySchema);
