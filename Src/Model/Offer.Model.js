import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema(
  {
    OfferName: {
      type: String,
      required: true,
    },
    Discount: {
      type: String,
      required: true,
    },
    Percentage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Offer = mongoose.model("Offer", OfferSchema);
