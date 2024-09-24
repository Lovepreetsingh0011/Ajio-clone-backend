import { Router } from "express";
import { AuthMiddelware } from "../Middelware/AuthMiddelware.js";
import { upload } from "../Utils/Multer.js";
import {
  Slider_create_controler,
  Update_Slider_Details_Controler,
  Update_Slider_image_controler,
  Get_All_Sliders_controler,
  Get_Slider_ByName_controler,
  Delete_Slider_controler,
} from "../Controler/Slider.controler.js";

const router = Router();

router
  .route("/create")
  .post(AuthMiddelware, upload.single("Image"), Slider_create_controler);
router
  .route("/update_details/:id")
  .post(AuthMiddelware, Update_Slider_Details_Controler);
router
  .route("/update_image/:id")
  .put(AuthMiddelware, upload.single("Image"), Update_Slider_image_controler);

router.route("/get_all").get(AuthMiddelware, Get_All_Sliders_controler);

router.route("/get_slider_byname/:SliderName").get(Get_Slider_ByName_controler);
router.route("/delete/:id").delete(AuthMiddelware, Delete_Slider_controler);

export default router;
