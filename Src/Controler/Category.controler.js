import slugify from "slugify";
import { Category } from "../Model/Category.Model.js";

// Create category controler
const Create_controler = async (req, res) => {
  try {
    const { Name } = req.body;
    if (!Name || Name.trim() == "") {
      return res.status(404).json({
        msg: "Name is Required",
        success: false,
      });
    }
    const { SubCategory } = req.body;
    if (!SubCategory || SubCategory == null) {
      return res.status(404).json({
        msg: "SubCategory is Required",
        success: false,
      });
    }
    const { ChildSubCategory } = req.body;
    if (!ChildSubCategory) {
      return res.status(404).json({
        msg: "ChildSubCategory is Required",
        success: false,
      });
    }
    // Create the category
    const data = await Category.create({
      Name,
      Slug: slugify(Name),
      SubCategory,
      ChildSubCategory,
    });
    if (!data) {
      return res.status(500).json({
        msg: "cannot create category , internal server error occur ",
        success: false,
      });
    }

    // return statement

    return res.status(200).json({
      msg: "Category create Successfully ",
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

// Update Category controler
const Update_Name_controler = async (req, res) => {
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
    const data = await Category.findByIdAndUpdate(
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
        msg: "cannot Update category  ",
        success: false,
      });
    }

    // return statement

    return res.status(200).json({
      msg: "Category Update Successfully ",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Update category controeler",
      success: false,
      error: error.message,
    });
  }
};

// Update ChildSubCategory Category controler
const Update_ChildSubCatgory_controler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.trim() == "") {
      return res.status(404).json({
        msg: "Id is Required",
        success: false,
      });
    }
    const { ChildSubCategory } = req.body;
    if (!ChildSubCategory || ChildSubCategory.trim() == "") {
      return res.status(404).json({
        msg: "ChildSubCategory is Required",
        success: false,
      });
    }
    // Update the category
    const data = await Category.findByIdAndUpdate(
      id,
      {
        ChildSubCategory,
      },
      {
        new: true,
      }
    );

    if (!data) {
      return res.status(400).json({
        msg: "cannot Update category  ",
        success: false,
      });
    }

    // return statement

    return res.status(200).json({
      msg: "Category Update Successfully ",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Update category controeler",
      success: false,
      error: error.message,
    });
  }
};
const AddNew_SubCatgory_controler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.trim() == "") {
      return res.status(404).json({
        msg: "Id is Required",
        success: false,
      });
    }
    const { SubCategory } = req.body;
    if (!SubCategory || SubCategory.trim() == "") {
      return res.status(404).json({
        msg: "SubCategory is Required",
        success: false,
      });
    }
    let newcategory = SubCategory;

    // If already exist
    const exits = await Category.findById(id);
    if (exits.SubCategory.some((value) => value == SubCategory)) {
      return res.status(400).json({
        msg: "This Category is Already exits   ",
        success: false,
      });
    }
    // Add new the category

    const data = await Category.findByIdAndUpdate(
      id,
      {
        $push: { SubCategory: newcategory },
      },
      {
        new: true,
      }
    );

    if (!data) {
      return res.status(400).json({
        msg: "cannot Add Subcategory  ",
        success: false,
      });
    }

    // return statement

    return res.status(200).json({
      msg: "SubCategory add Successfully ",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Addnew Subcategory controeler",
      success: false,
      error: error.message,
    });
  }
};
const Remove_SubCatgory_controler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.trim() == "") {
      return res.status(404).json({
        msg: "Id is Required",
        success: false,
      });
    }
    const { SubCategory } = req.body;
    if (!SubCategory || SubCategory.trim() == "") {
      return res.status(404).json({
        msg: "SubCategory is Required",
        success: false,
      });
    }
    let newcategory = SubCategory;
    // If Not exist
    const exits = await Category.findById(id);
    if (!exits.SubCategory.some((value) => value == SubCategory)) {
      return res.status(400).json({
        msg: "This Category is Not exits   ",
        success: false,
      });
    }
    // Add new the category

    const data = await Category.findByIdAndUpdate(
      id,
      {
        $pull: { SubCategory: newcategory },
      },
      {
        new: true,
      }
    );
    console.log(data);

    if (!data) {
      return res.status(400).json({
        msg: "cannot Remove Subcategory  ",
        success: false,
      });
    }

    // return statement

    return res.status(200).json({
      msg: "SubCategory Remove Successfully ",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Remove Subcategory controeler",
      success: false,
      error: error.message,
    });
  }
};
// Delete Category controler
const Delete_category_controler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.trim() == "") {
      return res.status(404).json({
        msg: "Id is require",
        success: false,
      });
    }
    const data = await Category.findByIdAndDelete(id);

    if (!data) {
      return res.status(400).json({
        msg: "cant Deleted category ",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "category Deleted successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Delete Category controler",
      success: false,
      error: error.message,
    });
  }
};

// Get All Category controler
const GetAll_Category_controler = async (req, res) => {
  try {
    const data = await Category.find()
      .populate("SubCategory")
      .populate("ChildSubCategory");
    if (!data) {
      return res.status(404).json({
        msg: "error occur will find all Category",
        success: false,
      });
    }

    // Return statement
    return res.status(200).json({
      msg: "successfully find All Category",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get All Category controler",
      success: false,
      error: error.message,
    });
  }
};
// Get All With ChildCategory Category controler
const GetAll_With_ChildSubCategory_controler = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Category.find({ ChildSubCategory: id })
      .populate("SubCategory")
      .populate("ChildSubCategory");
    if (!data) {
      return res.status(404).json({
        msg: "error occur will find all Category",
        success: false,
      });
    }

    // Return statement
    return res.status(200).json({
      msg: "successfully find All Category",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get All Category controler",
      success: false,
      error: error.message,
    });
  }
};
// Get Single Categoty By Name
const Get_single_Category_ByName = async (req, res) => {
  try {
    const { Name } = req.body;
    if (!Name || Name.trim() == "") {
      return res.status(404).json({
        msg: "Name is Required",
        success: false,
      });
    }
    const cate = slugify(Name);
    const data = await Category.findOne({ Slug: cate });
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
      msg: "error occur in Get All Category controler",
      success: false,
      error: error.message,
    });
  }
};

// Get Single Categoty By ID

const Get_single_Category_ByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.trim() == "") {
      return res.status(404).json({
        msg: "Id is Required",
        success: false,
      });
    }

    const data = await Category.findById(id).populate("SubCategory");
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
      msg: "error occur in Get single  Category by id controler",
      success: false,
      error: error.message,
    });
  }
};

export {
  Create_controler,
  Update_Name_controler,
  Update_ChildSubCatgory_controler,
  AddNew_SubCatgory_controler,
  Remove_SubCatgory_controler,
  Delete_category_controler,
  GetAll_Category_controler,
  GetAll_With_ChildSubCategory_controler,
  Get_single_Category_ByName,
  Get_single_Category_ByID,
};
