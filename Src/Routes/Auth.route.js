import express from "express";
import {
  Login_OTP_Controler,
  Register_controler,
  Login_Check_OTP_Controler,
  Update_details_controler,
  Logout_controler,
} from "../Controler/Auth.controler.js";
import { AuthMiddelware } from "../Middelware/AuthMiddelware.js";

const router = express.Router();

router.route("/register").post(Register_controler);
router.route("/login_OTP").post(Login_OTP_Controler);
router.route("/login").post(Login_Check_OTP_Controler);
router.route("/update_details").post(AuthMiddelware, Update_details_controler);
router.route("/logout").get(AuthMiddelware, Logout_controler);

export default router;
