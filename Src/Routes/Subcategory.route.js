import { Router } from "express";
import { AuthMiddelware } from "../Middelware/AuthMiddelware.js";
import { AdminMiddelware } from "../Middelware/AdminMiddelware.js";
import {
  Create_controler,
  Update_controler,
  Delete_controler,
  GetAll_controler,
  GetAllwith_ChildSubCategory_controler,
  Getsingle_withName,
  Getsingle_withId,
} from "../Controler/Subcategory.controler.js";
import { SellerMiddelware } from "../Middelware/SellerMiddelware.js";

const router = Router();

router.route("/create").post(AuthMiddelware, AdminMiddelware, Create_controler);
router
  .route("/update/:id")
  .put(AuthMiddelware, AdminMiddelware, Update_controler);
router
  .route("/delete/:id")
  .delete(AuthMiddelware, AdminMiddelware, Delete_controler);
router.route("/getall").get(GetAll_controler);
router
  .route("/getall_withChildSubCategory/:id")
  .get(GetAllwith_ChildSubCategory_controler);

router.route("/getsingle_withName/:Name").get(Getsingle_withName);
router
  .route("/getsingle_withId/:id")
  .get(AuthMiddelware, SellerMiddelware, Getsingle_withId);

export default router;
