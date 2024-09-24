import { Router } from "express";
import { AuthMiddelware } from "../Middelware/AuthMiddelware.js";
import { SellerMiddelware } from "../Middelware/SellerMiddelware.js";
const router = Router();

import {
  GetALL_with_category,
  Get_All_Products_controler,
  Product_create_controler,
  Update_image1_controler,
  Update_image2_controler,
  Update_image3_controler,
  Update_image4_controler,
  Update_image_controler,
  Update_Product_Details_Controler,
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
} from "../Controler/Product.controler.js";
import { upload } from "../Utils/Multer.js";

router.route("/create").post(
  AuthMiddelware,
  SellerMiddelware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  Product_create_controler
);
router
  .route("/update_details/:id")
  .post(AuthMiddelware, SellerMiddelware, Update_Product_Details_Controler);

router
  .route("/update_Image/:id")
  .put(
    AuthMiddelware,
    SellerMiddelware,
    upload.single("Img"),
    Update_image_controler
  );
router
  .route("/update_Image1/:id")
  .put(
    AuthMiddelware,
    SellerMiddelware,
    upload.single("Img"),
    Update_image1_controler
  );
router
  .route("/update_Image2/:id")
  .put(
    AuthMiddelware,
    SellerMiddelware,
    upload.single("Img"),
    Update_image2_controler
  );
router
  .route("/update_Image3/:id")
  .put(
    AuthMiddelware,
    SellerMiddelware,
    upload.single("Img"),
    Update_image3_controler
  );
router
  .route("/update_Image4/:id")
  .put(
    AuthMiddelware,
    SellerMiddelware,
    upload.single("Img"),
    Update_image4_controler
  );

router
  .route("/all_seller_product")
  .get(AuthMiddelware, SellerMiddelware, GetAll_Seller_Products);

router
  .route("/allseller_product_withcategory/:id")
  .get(AuthMiddelware, SellerMiddelware, ALL_SellerProduct_withcategory);
router
  .route("/allseller_product_withsubcategory/:id")
  .get(AuthMiddelware, SellerMiddelware, ALL_SellerProduct_with_SubCategory);
router
  .route("/allseller_product_withchildsubcategory/:id")
  .get(
    AuthMiddelware,
    SellerMiddelware,
    ALL_SellerProduct_with_ChildSubCategory
  );
router
  .route("/seller_product_with_id/:id")
  .get(AuthMiddelware, SellerMiddelware, Getsingle_Seller_product);
router
  .route("/seller_product_with_name/:Name")
  .get(AuthMiddelware, SellerMiddelware, Getsingle_Seller_product_withName);
router
  .route("/delete_seller_product/:id")
  .delete(AuthMiddelware, SellerMiddelware, Delete_Seller_product);
router.route("/apply_offer").post(AuthMiddelware, Apply_offer_code);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//FOR ALL USERS
router.route("/get_all").get(AuthMiddelware, Get_All_Products_controler);
router
  .route("/getall_with_category/:id")
  .get(AuthMiddelware, GetALL_with_category);
router
  .route("/getall_with_Subcategory/:id")
  .get(AuthMiddelware, GetALL_with_Subcategory);
router
  .route("/getall_with_childsubcategory/:id")
  .get(AuthMiddelware, GetALL_with_ChildSubCategory);
router.route("/get_single_product/:id").get(AuthMiddelware, Get_single_product);

router
  .route("/get_product_byname/:Name")
  .get(AuthMiddelware, Get_single_product_byName);
router
  .route("/delete/:id")
  .delete(AuthMiddelware, AuthMiddelware, Delete_product_controler);

export default router;
