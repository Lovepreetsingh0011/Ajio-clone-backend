import mongoose from "mongoose";
const Childsubcategoryschema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Slug: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ChildSubcategory = mongoose.model(
  "ChildSubcategory",
  Childsubcategoryschema
);
