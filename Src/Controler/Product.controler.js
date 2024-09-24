import { Uploadcloud } from "../Utils/Cloudniary.js";
import { Product } from "../Model/Product.Model.js";
import slugify from "slugify";
import { Offer } from "../Model/Offer.Model.js";
// Product create controler
const Product_create_controler = async (req, res) => {
  try {
    const {
      Name,
      Category,
      SubCategory,
      ChildSubCategory,
      ProductType,
      MFD,
      MFB,
      CompanyName,
      Price,
      Offerid,
      ProductDetails,
      Description,
      Title,
      Quantity,
    } = req.body;

    // Inputs fields Validations
    if (
      [
        Name,
        Category,
        SubCategory,
        ChildSubCategory,
        ProductType,
        MFD,
        MFB,
        CompanyName,
        Price,
        Offerid,
        Description,
        Title,
        Quantity,
      ].some((value) => !value || value.trim() == "")
    ) {
      return res.status(404).json({
        msg: "All  inputs fields are Required",
        success: false,
      });
    }
    let dis;
    // Find the Offer Object by id
    let offer_ob = await Offer.findById({ _id: Offerid });
    // Offer Calculation

    if (offer_ob) {
      let result = (parseInt(offer_ob.Percentage) / 100) * Price;
      dis = Price - result;
    } else {
      let result = (0 / 100) * Price;
      dis = Price - result;
    }

    // Image Validations
    const { image, image1, image2, image3, image4 } = req.files;

    if (
      [image, image1, image2, image3, image4].some((value) => value == null)
    ) {
      return res.status(404).json({
        msg: "All  inputs Image fields are Required",
        success: false,
      });
    }

    // Cloundniary uploads
    const img = await Uploadcloud(image[0].path);
    const img1 = await Uploadcloud(image1[0].path);
    const img2 = await Uploadcloud(image2[0].path);
    const img3 = await Uploadcloud(image3[0].path);
    const img4 = await Uploadcloud(image4[0].path);

    if (!img.url) {
      return res.status(404).json({
        msg: "image cannot upload on cloudniary",
        success: false,
      });
    }
    if (!img1.url) {
      return res.status(404).json({
        msg: "image1 cannot upload on cloudniary",
        success: false,
      });
    }
    if (!img2.url) {
      return res.status(404).json({
        msg: "image2 cannot upload on cloudniary",
        success: false,
      });
    }
    if (!img3.url) {
      return res.status(404).json({
        msg: "image3 cannot upload on cloudniary",
        success: false,
      });
    }
    if (!img4.url) {
      return res.status(404).json({
        msg: "image4 cannot upload on cloudniary",
        success: false,
      });
    }

    // Upload on Database

    const data = await Product.create({
      Name,
      Userid: req.user,
      SellerId: req.seller,
      Category,
      SubCategory,
      ChildSubCategory,
      ProductType,
      MFD,
      MFB,
      CompanyName,
      Price,
      Offerid,
      ProductDetails,
      Description,
      Title,
      Quantity,
      FinalPrice: dis,
      OfferPercentage: offer_ob ? offer_ob.Discount : "0%",
      slug: slugify(Name),
      Image: img.url,
      Image1: img1.url,
      Image2: img2.url,
      Image3: img3.url,
      Image4: img4.url,
    });

    if (!data) {
      return res.status(500).json({
        msg: "Error Occur Will Uplaod Product",
        success: false,
      });
    }

    // Return statement

    return res.status(200).json({
      msg: "Product Upload Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Produc Create Cntroler",
      success: false,
      errormsg: error.message,
    });
  }
};

// Product Update Details Controlers
const Update_Product_Details_Controler = async (req, res) => {
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
      Category,
      SubCategory,
      ChildSubCategory,
      ProductType,
      MFD,
      MFB,
      CompanyName,
      Price,
      Offerid,
      ProductDetails,
      Description,
      Title,
      Quantity,
    } = req.body;

    // Inputs fields Validations
    if (
      [
        Name,
        Category,
        SubCategory,
        ChildSubCategory,
        ProductType,
        MFD,
        MFB,
        CompanyName,
        Price,
        Offerid,
        ProductDetails,
        Description,
        Title,
        Quantity,
      ].some((value) => !value || value == "")
    ) {
      return res.status(404).json({
        msg: "All  inputs fields are Required",
        success: false,
      });
    }

    //  Seller Verification
    const authorizedseller = await Product.findOne({
      $and: [{ _id: id }, { SellerId: req.seller }],
    });

    if (!authorizedseller) {
      return res.status(404).json({
        msg: " AunAutorized Access",
        success: false,
      });
    }

    // Offer Validation
    let dis;
    // Find the Offer Object by id
    let offer_ob = await Offer.findById({ _id: Offerid });
    // Offer Calculation

    if (offer_ob) {
      let result = (parseInt(offer_ob.Percentage) / 100) * Price;
      dis = Price - result;
    } else {
      let result = (0 / 100) * Price;
      dis = Price - result;
    }

    // Find The Object
    const data = await Product.findByIdAndUpdate(
      id,
      {
        Name,
        Category,
        SubCategory,
        ChildSubCategory,
        ProductType,
        MFD,
        MFB,
        CompanyName,
        Price,
        Offerid,
        ProductDetails,
        Description,
        Title,
        Quantity,
        FinalPrice: dis,
        OfferPercentage: offer_ob ? offer_ob.Discount : "0%",
        slug: slugify(Name),
      },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({
        msg: "cant update product",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "   Product Update Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Update Product details controler",
      success: false,
      errormsg: error.message,
    });
  }
};

// Product Update Image Controlers
const Update_image_controler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " product id is required to change",
        success: false,
      });
    }

    const Img = req.file;

    if (Img == null) {
      return res.status(404).json({
        msg: "Image is required to change",
        success: false,
      });
    }

    //  Seller Verification
    const authorizedseller = await Product.findOne({
      $and: [{ _id: id }, { SellerId: req.seller }],
    });

    if (!authorizedseller) {
      return res.status(404).json({
        msg: " AunAutorized Access",
        success: false,
      });
    }

    const image = await Uploadcloud(Img.path);
    if (!image.url) {
      return res.status(404).json({
        msg: "Image cannot upload on cloud ",
        success: false,
      });
    }
    // Find the object and change

    const data = await Product.findByIdAndUpdate(
      { _id: id },
      {
        Image: image.url,
      },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({
        msg: "Product object cannot update   ",
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
      msg: "error occur in Update Product Image Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
// Product Update Image1 Controlers
const Update_image1_controler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " product id is required to change",
        success: false,
      });
    }
    const Img = req.file;
    if (Img == null) {
      return res.status(404).json({
        msg: "Image1 is required to change",
        success: false,
      });
    }

    //  Seller Verification
    const authorizedseller = await Product.findOne({
      $and: [{ _id: id }, { SellerId: req.seller }],
    });

    if (!authorizedseller) {
      return res.status(404).json({
        msg: " AunAutorized Access",
        success: false,
      });
    }

    const image = await Uploadcloud(Img.path);
    if (!image.url) {
      return res.status(404).json({
        msg: "Image1 cannot upload on cloud ",
        success: false,
      });
    }
    // Find the object and change

    const data = await Product.findByIdAndUpdate(
      { _id: id },
      {
        Image1: image.url,
      },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({
        msg: "Product object cannot update   ",
        success: false,
      });
    }

    // Return Statement
    return res.status(200).json({
      msg: "Image1 change Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Update Image1 Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
// Product Update Image2 Controlers
const Update_image2_controler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " product id is required to change",
        success: false,
      });
    }
    const Img = req.file;
    if (Img == null) {
      return res.status(404).json({
        msg: "Image2 is required to change",
        success: false,
      });
    }
    //  Seller Verification
    const authorizedseller = await Product.findOne({
      $and: [{ _id: id }, { SellerId: req.seller }],
    });

    if (!authorizedseller) {
      return res.status(404).json({
        msg: " AunAutorized Access",
        success: false,
      });
    }

    const image = await Uploadcloud(Img.path);
    if (!image.url) {
      return res.status(404).json({
        msg: "Image2 cannot upload on cloud ",
        success: false,
      });
    }
    // Find the object and change

    const data = await Product.findByIdAndUpdate(
      { _id: id },
      {
        Image2: image.url,
      },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({
        msg: "Product object cannot update   ",
        success: false,
      });
    }

    // Return Statement
    return res.status(200).json({
      msg: "Image2 change Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Update Image2 Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
// Product Update Image3 Controlers
const Update_image3_controler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " product id is required to change",
        success: false,
      });
    }
    const Img = req.file;
    if (Img == null) {
      return res.status(404).json({
        msg: "Image3 is required to change",
        success: false,
      });
    }
    //  Seller Verification
    const authorizedseller = await Product.findOne({
      $and: [{ _id: id }, { SellerId: req.seller }],
    });

    if (!authorizedseller) {
      return res.status(404).json({
        msg: " AunAutorized Access",
        success: false,
      });
    }

    const imgage = await Uploadcloud(Img.path);
    if (!imgage.url) {
      return res.status(404).json({
        msg: "Image3 cannot upload on cloud ",
        success: false,
      });
    }
    // Find the object and change

    const data = await Product.findByIdAndUpdate(
      { _id: id },
      {
        Image3: imgage.url,
      },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({
        msg: "Product object cannot update   ",
        success: false,
      });
    }

    // Return Statement
    return res.status(200).json({
      msg: "Image3 change Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Update Image1 Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
// Product Update Image4 Controlers
const Update_image4_controler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " product id is required to change",
        success: false,
      });
    }
    const Img = req.file;
    if (Img == null) {
      return res.status(404).json({
        msg: "Image4 is required to change",
        success: false,
      });
    }
    //  Seller Verification
    const authorizedseller = await Product.findOne({
      $and: [{ _id: id }, { SellerId: req.seller }],
    });

    if (!authorizedseller) {
      return res.status(404).json({
        msg: " AunAutorized Access ",
        success: false,
      });
    }

    const image = await Uploadcloud(Img.path);
    if (!image.url) {
      return res.status(404).json({
        msg: "Image4 cannot upload on cloud ",
        success: false,
      });
    }
    // Find the object and change

    const data = await Product.findByIdAndUpdate(
      { _id: id },
      {
        Image4: image.url,
      },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({
        msg: "Product object cannot update   ",
        success: false,
      });
    }

    // Return Statement
    return res.status(200).json({
      msg: "Image4 change Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Update Image4 Controler",
      success: false,
      errormsg: error.message,
    });
  }
};

// Get All Products
const GetAll_Seller_Products = async (req, res) => {
  try {
    const data = await Product.find({ SellerId: req.seller });
    if (!data) {
      return res.status(404).json({
        msg: "error occur Will find all Seller products ",
        success: false,
      });
    }
    // Return statement
    return res.status(200).json({
      msg: "Products Founds Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get ALl Seller Products  Controler",
      success: false,
      errormsg: error.message,
    });
  }
};

// Get All Seller Products find by Category
const ALL_SellerProduct_withcategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " category id is required ",
        success: false,
      });
    }
    const data = await Product.find({
      $and: [{ SellerId: req.seller }, { Category: id }],
    });
    if (!data) {
      return res.status(404).json({
        msg: "error occur Will find  products ",
        success: false,
      });
    }
    // Return statement
    return res.status(200).json({
      msg: "Products Founds Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get ALl Products with category Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
// Get All Seller Products find by Sub Category

const ALL_SellerProduct_with_SubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " Subcategory id is required ",
        success: false,
      });
    }
    const data = await Product.find({
      $and: [{ SellerId: req.seller }, { SubCategory: id }],
    });
    if (!data) {
      return res.status(404).json({
        msg: "error occur Will find  products ",
        success: false,
      });
    }
    // Return statement
    return res.status(200).json({
      msg: "Products Founds Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get ALl Products  with subcategory Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
// Get All Products find by Sub Category

const ALL_SellerProduct_with_ChildSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " ChildSubcategory id is required ",
        success: false,
      });
    }
    const data = await Product.find({
      $and: [{ SellerId: req.seller }, { ChildSubCategory: id }],
    });
    if (!data) {
      return res.status(404).json({
        msg: "error occur Will find  products ",
        success: false,
      });
    }
    // Return statement
    return res.status(200).json({
      msg: "Products Founds Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get ALl Products with childsubcategory Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
// Get Single Seller Product
const Getsingle_Seller_product = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " product id is required ",
        success: false,
      });
    }
    const data = await Product.findOne({
      $and: [{ _id: id }, { SellerId: req.seller }],
    })
      .populate("ChildSubCategory")
      .populate("SubCategory")
      .populate("Category")
      .populate("Offerid");
    if (!data) {
      return res.status(404).json({
        msg: "error occur Will find  product ",
        success: false,
      });
    }
    // Return statement
    return res.status(200).json({
      msg: "Product Found Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get single Products  Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
// Get Single Seller Product By Name
const Getsingle_Seller_product_withName = async (req, res) => {
  try {
    const { Name } = req.params;
    if (!Name || Name == "") {
      return res.status(404).json({
        msg: " product Name is required ",
        success: false,
      });
    }
    const slug = slugify(Name);
    const data = await Product.findOne({
      $and: [{ SellerId: req.seller }, { slug: slug }],
    });
    if (!data) {
      return res.status(404).json({
        msg: " cant find  product ",
        success: false,
      });
    }
    // Return statement
    return res.status(200).json({
      msg: "Product Found Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get Single Products  Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
const Delete_Seller_product = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " product id is required ",
        success: false,
      });
    }
    const Checkproduct = await Product.findOne({
      $and: [{ _id: id }, { SellerId: req.seller }],
    });

    if (!Checkproduct) {
      return res.status(404).json({
        msg: "product Not Found",
        success: false,
      });
    }
    console.log(id);

    const data = await Product.findByIdAndDelete({ _id: id });
    if (!data) {
      return res.status(404).json({
        msg: "  error occur will delte product",
        success: false,
      });
    }
    // Return statement
    return res.status(200).json({
      msg: "Product Delete Successfully",
      success: true,
      // data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Delete Product  Controler",
      success: false,
      errormsg: error.message,
    });
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
// FOR ALL USERS

// Get All Products
const Get_All_Products_controler = async (req, res) => {
  try {
    const data = await Product.find();
    if (!data) {
      return res.status(404).json({
        msg: "error occur Will find all products ",
        success: false,
      });
    }
    // Return statement
    return res.status(200).json({
      msg: "Products Founds Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get ALl Products  Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
// Get All Products find by Category
const GetALL_with_category = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " category id is required ",
        success: false,
      });
    }
    const data = await Product.find({ Category: id });
    if (!data) {
      return res.status(404).json({
        msg: "error occur Will find  products ",
        success: false,
      });
    }
    // Return statement
    return res.status(200).json({
      msg: "Products Founds Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get ALl Products  Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
// Get All Products find by Sub Category

const GetALL_with_Subcategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " Sub_category id is required ",
        success: false,
      });
    }
    const data = await Product.find({ SubCategory: id });
    if (!data) {
      return res.status(404).json({
        msg: "error occur Will find  products ",
        success: false,
      });
    }
    // Return statement
    return res.status(200).json({
      msg: "Products Founds Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get ALl Products  Controler",
      success: false,
      errormsg: error.message,
    });
  }
};

// Get All Products find by Sub Category And Child sub category

const GetALL_with_ChildSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: "  id is required ",
        success: false,
      });
    }

    const data = await Product.find({ ChildSubCategory: id });

    if (!data) {
      return res.status(404).json({
        msg: "error occur Will find  products ",
        success: false,
      });
    }
    // Return statement
    return res.status(200).json({
      msg: "Products Founds Successfully",
      success: true,

      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get ALl Products  Controler",
      success: false,
      errormsg: error.message,
    });
  }
};
// Get Single Product
const Get_single_product = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " product id is required ",
        success: false,
      });
    }
    const data = await Product.findById(id);
    if (!data) {
      return res.status(404).json({
        msg: "error occur Will find  product ",
        success: false,
      });
    }
    // Return statement
    return res.status(200).json({
      msg: "Product Found Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get single Products  Controler",
      success: false,
      errormsg: error.message,
    });
  }
};

// Get Single Product By Name
const Get_single_product_byName = async (req, res) => {
  try {
    const { Name } = req.params;
    if (!Name || Name == "") {
      return res.status(404).json({
        msg: " product Name is required ",
        success: false,
      });
    }
    const slug = slugify(Name);
    console.log(slug);
    const data = await Product.findOne({ slug: slug });
    if (!data) {
      return res.status(404).json({
        msg: " cant find  product ",
        success: false,
      });
    }
    // Return statement
    return res.status(200).json({
      msg: "Product Found Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Get ALl Products  Controler",
      success: false,
      errormsg: error.message,
    });
  }
};

const Delete_product_controler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(404).json({
        msg: " product id is required ",
        success: false,
      });
    }

    const data = await Product.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({
        msg: "  error occur will delte product",
        success: false,
      });
    }
    // Return statement
    return res.status(200).json({
      msg: "Product Delete Successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Delete Product  Controler",
      success: false,
      errormsg: error.message,
    });
  }
};

// Find Product by Sub Category
// Apply Offer in Client Side
const Apply_offer_code = async (req, res) => {
  try {
    const { Offer_id, Product_id } = req.body;
    if (Offer_id == "" || Product_id == "") {
      return res.status(404).json({
        msg: "all fields are required",
        success: false,
      });
    }
    // Check the offer
    const data = await Offer.findById({ _id: Offer_id });
    if (!data) {
      return res.status(404).json({
        msg: "Invalid Offer Code",
        success: false,
      });
    }
    // find The Product
    const product = await Product.findById({ _id: Product_id });
    if (!product) {
      return res.status(404).json({
        msg: "invalid product id",
        success: false,
      });
    }

    // offer Calculations
    let result = (parseInt(data.Percentage) / 100) * product.Price;
    let newdis = product.Price - result;

    return res.status(404).json({
      success: true,
      msg: "successfully found",
      product: {
        ...product,
        Offer_per: data.Discount,
        Offer_Pri: newdis,
      },
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error occur in Apply offer  controler",
      success: false,
      errormsg: error.message,
    });
  }
};
export {
  Product_create_controler,
  Update_Product_Details_Controler,
  Update_image_controler,
  Update_image1_controler,
  Update_image2_controler,
  Update_image3_controler,
  Update_image4_controler,
  Get_All_Products_controler,
  GetALL_with_category,
  Get_single_product,
  Get_single_product_byName,
  Delete_product_controler,
  Apply_offer_code,
  GetALL_with_Subcategory,
  GetALL_with_ChildSubCategory,
  GetAll_Seller_Products,
  ALL_SellerProduct_withcategory,
  ALL_SellerProduct_with_SubCategory,
  ALL_SellerProduct_with_ChildSubCategory,
  Getsingle_Seller_product,
  Getsingle_Seller_product_withName,
  Delete_Seller_product,
};
