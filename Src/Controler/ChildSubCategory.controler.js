import slugify from "slugify";
import { ChildSubcategory } from "../Model/ChildSubcategory.Model.js";

const Create_controler = async (req, res) => {
  try {
    const { Name } = req.body;
    if (!Name || Name.trim() == "") {
      return res.status(404).json({
        msg: "Name is Required",
        success: false,
      });
    }

    // Create the category
    const data = await ChildSubcategory.create({
      Name,
      Slug: slugify(Name),
    });
    if (!data) {
      return res.status(500).json({
        msg: "cannot create ChildSubCategory , internal server error occur ",
        success: false,
      });
    }

    // return statement

    return res.status(200).json({
      msg: "ChildSubCategory create Successfully ",
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

    // Update the category
    const data = await ChildSubcategory.findByIdAndUpdate(
      id,
      {
        Name,
        Slug: slugify(Name),
      },
      {
        new: true,
      }
    );

    if (!data) {
      return res.status(400).json({
        msg: "cannot Update ChildSubCategory  ",
        success: false,
      });
    }

    // return statement

    return res.status(200).json({
      msg: "ChildSubCategory Update Successfully ",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Update ChildSubcategory controeler",
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
    const data = await ChildSubcategory.findByIdAndDelete(id);

    if (!data) {
      return res.status(400).json({
        msg: "cant Deleted ChildSubCategory ",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "ChildSubcategory Deleted successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Delete ChildSubCategory controler",
      success: false,
      error: error.message,
    });
  }
};
// Get All Category controler
const GetAll_controler = async (req, res) => {
  try {
    const data = await ChildSubcategory.find();
    if (!data) {
      return res.status(404).json({
        msg: "error occur will find all ChildSubCategory",
        success: false,
      });
    }

    // Return statement
    return res.status(200).json({
      msg: "successfully find All ChildSubCategory",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get All ChildSubCategory controler",
      success: false,
      error: error.message,
    });
  }
};
// Get Single Categoty By Name
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
    const data = await ChildSubcategory.findOne({ Slug: cate });
    if (!data) {
      return res.status(404).json({
        msg: "cant find ",
        success: false,
      });
    }

    // Return statement
    return res.status(200).json({
      msg: "successfully find  ChildSubCategory",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get Single  ChildSuBCategory controler",
      success: false,
      error: error.message,
    });
  }
};
const Getsingle_withID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.trim() == "") {
      return res.status(404).json({
        msg: "Id is Required",
        success: false,
      });
    }

    const data = await ChildSubcategory.findById(id);
    if (!data) {
      return res.status(404).json({
        msg: "cant find ",
        success: false,
      });
    }

    // Return statement
    return res.status(200).json({
      msg: "successfully find  ChildSubCategory",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get Single  ChildSubCategory controler",
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
  Getsingle_withName,
  Getsingle_withID,
};
