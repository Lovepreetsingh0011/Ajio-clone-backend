import { Router } from "express";
import {
  Create_controler,
  Seller_LoginOTP,
  LoginCheck_OTP,
  Update_controler,
  Logout_controler,
  Get_Seller,
} from "../Controler/Seller.controler.js";
import { AuthMiddelware } from "../Middelware/AuthMiddelware.js";
import { SellerMiddelware } from "../Middelware/SellerMiddelware.js";
import { AdminMiddelware } from "../Middelware/AdminMiddelware.js";
const router = Router();

router.route("/seller_create").post(AuthMiddelware, Create_controler);
router.route("/seller_login_otp").post(AuthMiddelware, Seller_LoginOTP);
router.route("/seller_otp_check").post(AuthMiddelware, LoginCheck_OTP);
router
  .route("/seller_update")
  .put(AuthMiddelware, SellerMiddelware, Update_controler);
router
  .route("/seller_logout")
  .get(AuthMiddelware, SellerMiddelware, Logout_controler);
router.route("/get_seller").get(AuthMiddelware, SellerMiddelware, Get_Seller);

export default router;
