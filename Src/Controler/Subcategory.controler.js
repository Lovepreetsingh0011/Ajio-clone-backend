import slugify from "slugify";
import { Subcategory } from "../Model/Subcategory.Model.js";
import mongoose from "mongoose";

const Create_controler = async (req, res) => {
  try {
    const { Name, ChildSubCategory } = req.body;
    if (!Name || Name.trim() == "") {
      return res.status(404).json({
        msg: "Name is Required",
        success: false,
      });
    }
    if (!ChildSubCategory || ChildSubCategory == null) {
      return res.status(404).json({
        msg: "ChildSubCategory is Required",
        success: false,
      });
    }
    // Create the category

    const data = await Subcategory.create({
      Name,
      Slug: slugify(Name),
      ChildSubCategory: ChildSubCategory,
    });
    if (!data) {
      return res.status(500).json({
        msg: "cannot create Sub_Category , internal server error occur ",
        success: false,
      });
    }

    // return statement

    return res.status(200).json({
      msg: "Sub_Category create Successfully ",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in create category controeler",
      success: false,
      error: error.message,
    });
  }
};
// Update Sub Category controler
const Update_controler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.trim() == "") {
      return res.status(404).json({
        msg: "Id is Required",
        success: false,
      });
    }
    const { Name } = req.body;
    if (!Name || Name.trim() == "") {
      return res.status(404).json({
        msg: "Name is Required",
        success: false,
      });
    }

    const { ChildSubCategory } = req.body;
    if (!ChildSubCategory || ChildSubCategory == null) {
      return res.status(404).json({
        msg: "ChildSubCategory is Required",
        success: false,
      });
    }

    // Update the category
    const data = await Subcategory.findByIdAndUpdate(
      id,
      {
        Name,
        Slug: slugify(Name),
        ChildSubCategory,
      },
      {
        new: true,
      }
    );

    if (!data) {
      return res.status(400).json({
        msg: "cannot Update Sub_category  ",
        success: false,
      });
    }

    // return statement

    return res.status(200).json({
      msg: "SubCategory Update Successfully ",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Update Subcategory controeler",
      success: false,
      error: error.message,
    });
  }
};

// Delete Category controler
const Delete_controler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.trim() == "") {
      return res.status(404).json({
        msg: "Id is require",
        success: false,
      });
    }
    const data = await Subcategory.findByIdAndDelete(id);

    if (!data) {
      return res.status(400).json({
        msg: "cant Deleted Subcategory ",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "Subcategory Deleted successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Delete SubCategory controler",
      success: false,
      error: error.message,
    });
  }
};
// Get All Category controler
const GetAll_controler = async (req, res) => {
  try {
    const data = await Subcategory.find().populate("ChildSubCategory");
    if (!data) {
      return res.status(404).json({
        msg: "error occur will find all SubCategory",
        success: false,
      });
    }

    // Return statement
    return res.status(200).json({
      msg: "successfully find All SubCategory",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get All SubCategory controler",
      success: false,
      error: error.message,
    });
  }
};

// Get All Category with  ChildSubCategory controler
const GetAllwith_ChildSubCategory_controler = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.trim() == "") {
      return res.status(404).json({
        msg: "ChildSubCategoryId is required",
        success: false,
      });
    }
    const data = await Subcategory.find({
      ChildSubCategory: id,
    }).populate("ChildSubCategory");

    if (!data) {
      return res.status(404).json({
        msg: "error occur will find all SubCategory with ChildSubCategory",
        success: false,
      });
    }

    // Return statement
    return res.status(200).json({
      msg: "successfully find All Sub_Category with ChildSubCategory",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get All SubCategory with ChildSubCategory controler",
      success: false,
      error: error.message,
    });
  }
};
// Get Single SubCategory By Name
const Getsingle_withName = async (req, res) => {
  try {
    const { Name } = req.params;
    if (!Name || Name.trim() == "") {
      return res.status(404).json({
        msg: "Name is Required",
        success: false,
      });
    }
    const cate = slugify(Name);
    const data = await Subcategory.findOne({ Slug: cate }).populate(
      "ChildSubCategory"
    );
    if (!data) {
      return res.status(404).json({
        msg: "cant find ",
        success: false,
      });
    }

    // Return statement
    return res.status(200).json({
      msg: "successfully find  SubCategory",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get Single  SubCategory controler",
      success: false,
      error: error.message,
    });
  }
};
const Getsingle_withId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.trim() == "") {
      return res.status(404).json({
        msg: "Id is Required",
        success: false,
      });
    }

    const data = await Subcategory.findById(id).populate("ChildSubCategory");
    if (!data) {
      return res.status(404).json({
        msg: "cant find ",
        success: false,
      });
    }

    // Return statement
    return res.status(200).json({
      msg: "successfully find  Category",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in GetSingle with id Category controler",
      success: false,
      error: error.message,
    });
  }
};

export {
  Create_controler,
  Update_controler,
  Delete_controler,
  GetAll_controler,
  GetAllwith_ChildSubCategory_controler,
  Getsingle_withName,
  Getsingle_withId,
};
