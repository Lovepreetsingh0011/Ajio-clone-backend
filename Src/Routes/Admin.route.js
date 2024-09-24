import { Router } from "express";
import { AuthMiddelware } from "../Middelware/AuthMiddelware.js";
import {
  ChangeRole_of_Seller,
  Admin_Register,
  Admin_LoginOTP,
  LoginCheck_OTP,
  Update_Admin_details,
  Logout_controler,
  GetAllUsers,
  GetAll_Seller,
  Get_Seller_withEmail,
  Get_Seller_withid,
  Delete_Seller,
  Get_User_withEmail,
  Get_User_withid,
  Delete_User,
} from "../Controler/Admin.controler.js";
import { AdminMiddelware } from "../Middelware/AdminMiddelware.js";
const router = Router();

router.route("/admin_register").post(AuthMiddelware, Admin_Register);
router.route("/admin_login_otp").post(AuthMiddelware, Admin_LoginOTP);
router.route("/admin_otp_check").post(AuthMiddelware, LoginCheck_OTP);
router
  .route("/admin_update")
  .post(AuthMiddelware, AdminMiddelware, Update_Admin_details);
router
  .route("/admin_logout")
  .get(AuthMiddelware, AdminMiddelware, Logout_controler);

/////////////////////////////////////////////////////////////
// FOR USER

router
  .route("/admin_gettall_users")
  .get(AuthMiddelware, AdminMiddelware, GetAllUsers);
router
  .route("/admin_getuserwith_Email/:Email")
  .get(AuthMiddelware, AdminMiddelware, Get_User_withEmail);
router
  .route("/admin_getuserwith_id/:id")
  .get(AuthMiddelware, AdminMiddelware, Get_User_withid);
router
  .route("/admin_delete_user/:id")
  .delete(AuthMiddelware, AdminMiddelware, Delete_User);

/////////////////////////////////////////////////////////////
// FOR SELLER
router
  .route("/admin_getall_seller")
  .get(AuthMiddelware, AdminMiddelware, GetAll_Seller);
router
  .route("/admin_getsellerwith_Email/:Email")
  .get(AuthMiddelware, AdminMiddelware, Get_Seller_withEmail);
router
  .route("/admin_getsellerwith_id/:id")
  .get(AuthMiddelware, AdminMiddelware, Get_Seller_withid);
router
  .route("/admin_delete_seller/:id")
  .delete(AuthMiddelware, AdminMiddelware, Delete_Seller);
router
  .route("/admin_change_sellerrole")
  .post(AdminMiddelware, ChangeRole_of_Seller);

export default router;
