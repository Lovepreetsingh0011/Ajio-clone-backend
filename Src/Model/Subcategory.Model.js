import mongoose from "mongoose";
const Subcategoryschmea = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Slug: {
      type: String,
    },
    ChildSubCategory: [
      { type: mongoose.Types.ObjectId, ref: "ChildSubcategory" },
    ],
  },
  { timestamps: true }
);

export const Subcategory = mongoose.model("Subcategory", Subcategoryschmea);
