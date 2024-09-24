import { Router } from "express";
import {
  Create_controler,
  Delete_category_controler,
  Get_single_Category_ByID,
  Get_single_Category_ByName,
  GetAll_Category_controler,
  GetAll_With_ChildSubCategory_controler,
  Update_Name_controler,
  Update_ChildSubCatgory_controler,
  AddNew_SubCatgory_controler,
  Remove_SubCatgory_controler,
} from "../Controler/Category.controler.js";
import { AuthMiddelware } from "../Middelware/AuthMiddelware.js";
import { AdminMiddelware } from "../Middelware/AdminMiddelware.js";
import { SellerMiddelware } from "../Middelware/SellerMiddelware.js";
const router = Router();

router.route("/create").post(AuthMiddelware, AdminMiddelware, Create_controler);
router
  .route("/updateName/:id")
  .post(AuthMiddelware, AdminMiddelware, Update_Name_controler);

router
  .route("/updateChildSubCategory/:id")
  .post(AuthMiddelware, AdminMiddelware, Update_ChildSubCatgory_controler);
router
  .route("/AddnewSubCategory/:id")
  .post(AuthMiddelware, AdminMiddelware, AddNew_SubCatgory_controler);
router
  .route("/RemoveSubCategory/:id")
  .post(AuthMiddelware, AdminMiddelware, Remove_SubCatgory_controler);
router
  .route("/delete/:id")
  .get(AuthMiddelware, AdminMiddelware, Delete_category_controler);

router.route("/getall").get(GetAll_Category_controler);
router
  .route("/getallwithChildSubCategory/:id")
  .get(GetAll_With_ChildSubCategory_controler);

router
  .route("/getsingle")
  .post(AuthMiddelware, SellerMiddelware, Get_single_Category_ByName);
router
  .route("/getsingle/:id")
  .get(AuthMiddelware, SellerMiddelware, Get_single_Category_ByID);

export default router;
