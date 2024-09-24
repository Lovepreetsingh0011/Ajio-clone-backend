import { Router } from "express";
import {
  Create_controler,
  Update_controler,
  Delete_controler,
  GetAll_controler,
  Getsingle_withName,
  Getsingle_withID,
} from "../Controler/ChildSubCategory.controler.js";
import { AuthMiddelware } from "../Middelware/AuthMiddelware.js";
import { AdminMiddelware } from "../Middelware/AdminMiddelware.js";
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
  .route("/getsinglewithName/:Name")
  .get(AuthMiddelware, SellerMiddelware, Getsingle_withName);
router
  .route("/getsinglewithId/:id")
  .get(AuthMiddelware, SellerMiddelware, Getsingle_withID);

export default router;
