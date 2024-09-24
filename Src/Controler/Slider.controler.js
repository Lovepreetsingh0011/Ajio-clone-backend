import slugify from "slugify";
import { Slider } from "../Model/Slider.Model.js";
import { Uploadcloud } from "../Utils/Cloudniary.js";

const Slider_create_controler = async (req, res) => {
  try {
    const {
      Name,
      SliderName,
      SliderNo,
      AddedBy,
      category,
      Sub_category,
      Sub_category_Age,
    } = req.body;

    // Inputs fields Validations
    if (
      [
        Name,
        SliderName,
        SliderNo,
        AddedBy,
        category,
        Sub_category,
        Sub_category_Age,
      ].some((value) => !value || value.trim() == "")
    ) {
      return res.status(404).json({
        msg: "All  inputs fields are Required",
        success: false,
      });
    }

    // Image Validations
    const Image = req.file;

    if (Image == null) {
      return res.status(404).json({
        msg: " Image fields are Required",
        success: false,
      });
    }

    // Cloundniary uploads
    const img = await Uploadcloud(Image.path);

    if (!img.url) {
      return res.status(404).json({
        msg: "image cannot upload on cloudniary",
        success: false,
      });
    }

    // Upload on Database

    const data = await Slider.create({
      Name,
      SliderName,
      Slug: slugify(SliderName),
      SliderNo: parseInt(SliderNo),
      AddedBy,
      category,
      Sub_category,
      Sub_category_Age,
      Image: img.url,
    });

    if (!data) {
      return res.status(500).json({
        msg: "Error Occur Will Uplaod Home Slider",
        success: false,
      });
    }

    // Return statement
    return res.status(200).json({
      msg: "HomeSlider Upload Successfully",
      success: true,

      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in HomeSliderfirst Create Cntroler",
      success: false,
      errormsg: error.message,
    });
  }
};

// Product Update Details Controlers
const Update_Slider_Details_Controler = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id == "") {
      return res.status(404).json({
        msg: "Id is Required",
        success: false,
      });
    }
    const {
      Name,
      SliderName,
      SliderNo,
      category,
      Sub_category,
      Sub_category_Age,
    } = req.body;

    // Inputs fields Validations
    if (
      [
        Name,
        SliderName,
        SliderNo,
        category,
        Sub_category,
        Sub_category_Age,
      ].some((value) => !value || value == "")
    ) {
      return res.status(404).json({
        msg: "All  inputs fields are Required",
        success: false,
      });
    }

    // Find The Object
    const data = await Slider.findByIdAndUpdate(
      id,
      {
        Name,
        SliderName,
        Slug: slugify(SliderName),
        SliderNo: parseInt(SliderNo),
        category,
        Sub_category,
        Sub_category_Age,
      },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({
        msg: "cant update HomeSlider",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "   HomeSlider Update Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Update HomeSliderFirst details controler",
      success: false,
      errormsg: error.message,
    });
  }
};

// Update Slider Image
const Update_Slider_image_controler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " Slider id is required to change",
        success: false,
      });
    }
    const Image = req.file;
    if (Image == null) {
      return res.status(404).json({
        msg: "Image is required to change",
        success: false,
      });
    }
    const img = await Uploadcloud(Image.path);
    if (!img.url) {
      return res.status(404).json({
        msg: "Image cannot upload on cloud ",
        success: false,
      });
    }
    // Find the object and change

    const data = await Slider.findByIdAndUpdate(
      { _id: id },
      {
        Image: img.url,
      },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({
        msg: "Slider object cannot update   ",
        success: false,
      });
    }

    // Return Statement
    return res.status(200).json({
      msg: "Image change Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Update Slider Image Controler",
      success: false,
      errormsg: error.message,
    });
  }
};

// get All Sliders
const Get_All_Sliders_controler = async (req, res) => {
  try {
    const data = await Slider.find();
    if (!data) {
      return res.status(404).json({
        msg: "error occur Will find all Slider ",
        success: false,
      });
    }
    // Return statement
    return res.status(200).json({
      msg: "Sliders Founds Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get ALl Sliders  Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
// Get Slider  By Name
const Get_Slider_ByName_controler = async (req, res) => {
  try {
    const { SliderName } = req.params;
    if (!SliderName || SliderName == "") {
      return res.status(404).json({
        msg: " Slider Name is required ",
        success: false,
      });
    }
    const slug = slugify(SliderName);
    const data = await Slider.find({ Slug: slug })
      .populate("category")
      .populate("Sub_category")
      .populate("Sub_category_Age");
    if (!data) {
      return res.status(404).json({
        msg: " cant find  Slider ",
        success: false,
      });
    }
    // Return statement
    return res.status(200).json({
      msg: "Slider Found Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get Slider by Name  Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
// Delete Slider
const Delete_Slider_controler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " Slider id is required ",
        success: false,
      });
    }

    const data = await Slider.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({
        msg: "  error occur will delte Slider",
        success: false,
      });
    }
    // Return statement
    return res.status(200).json({
      msg: "Slider Delete Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Delete Slider  Controler",
      success: false,
      errormsg: error.message,
    });
  }
};

export {
  Slider_create_controler,
  Update_Slider_Details_Controler,
  Update_Slider_image_controler,
  Get_All_Sliders_controler,
  Get_Slider_ByName_controler,
  Delete_Slider_controler,
};
