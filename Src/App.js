import express from "express";
import cookieParser from "cookie-parser";
import authroute from "./Routes/Auth.route.js";
import categoryroute from "./Routes/Category.route.js";
import productroute from "./Routes/Product.route.js";
import offerroute from "./Routes/Offer.route.js";
import subcategoryroute from "./Routes/Subcategory.route.js";
import ChildSubCategoryroute from "./Routes/ChildSubcategory.route.js";
import sliderroute from "./Routes/Slider.route.js";
import Sellerroute from "./Routes/Seller.route.js";
import Adminroute from "./Routes/Admin.route.js";
import cors from "cors";
var corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use("/app/api/auth", authroute);
app.use("/app/api/category", categoryroute);
app.use("/app/api/SubCategory", subcategoryroute);
app.use("/app/api/ChildSubCategory", ChildSubCategoryroute);
app.use("/app/api/product", productroute);
app.use("/app/api/offer", offerroute);
app.use("/app/api/slider", sliderroute);
app.use("/app/api/seller", Sellerroute);
app.use("/app/api/admin", Adminroute);

export { app };
