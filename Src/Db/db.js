import mongoose from "mongoose";

export const dbconnetion = async () => {
  try {
    const con = await mongoose.connect(process.env.DB_URL);
    if (con) {
      return console.log("Database connected Successfully");
    }
  } catch (error) {
    console.log("error occur in databse connection", error);
  }
};
