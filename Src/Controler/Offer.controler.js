import { Offer } from "../Model/Offer.Model.js";
import jwt from "jsonwebtoken";

const Offer_create_controler = async (req, res) => {
  try {
    const { OfferName, Discount, Percentage } = req.body;

    if (OfferName.trim() == "" || Discount == "" || Percentage == "") {
      return res.status(404).json({
        msg: "All fields are Required",
        success: false,
      });
    }

    // Create

    const data = await Offer.create({
      OfferName,
      Discount,
      Percentage,
    });

    if (!data) {
      return res.status(404).json({
        msg: "error occur will create offer",
        success: false,
      });
    }
    //  Return statement
    return res.status(200).json({
      msg: "offer create successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      msg: "error occur in Offer create Controler",
      error: error.message,
    });
  }
};

// Get All Offer
const Get_all_offer = async (req, res) => {
  try {
    const data = await Offer.find().select("-Percentage");
    if (!data) {
      return res.status(404).json({
        success: false,
        msg: "error occur will get all offer",
        error: error.message,
      });
    }
    // Return stament
    return res.status(200).json({
      success: true,
      msg: "offer get successfullt",
      data,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      msg: "error occur in Get All Offer Controler",
      error: error.message,
    });
  }
};

// Get  Offer by  Id

const Get_Offer_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        msg: "id is Required",
        success: false,
      });
    }

    const data = await Offer.findById({ _id: id });
    if (!data) {
      return res.status(404).json({
        success: false,
        msg: "error occur will get  offer",
        error: error.message,
      });
    }

    // Return stament
    return res.status(200).json({
      success: true,
      msg: "offer get successfullt",
      data,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      msg: "error occur in Get  Offer Controler",
      error: error.message,
    });
  }
};

// Detete Offer
const Delete_offer = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        msg: "id is Required",
        success: false,
      });
    }
    const data = await Offer.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        msg: "error occur will delete offer",
        error: error.message,
      });
    }

    // Return stament
    return res.status(200).json({
      success: true,
      msg: "offer delete succesfully",
      data,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      msg: "error occur offer delete Controler",
      error: error.message,
    });
  }
};
export { Offer_create_controler, Get_all_offer, Get_Offer_by_id, Delete_offer };
