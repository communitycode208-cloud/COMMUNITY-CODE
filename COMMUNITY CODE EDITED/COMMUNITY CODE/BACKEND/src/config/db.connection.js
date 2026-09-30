import mongoose from "mongoose";
import { MONGO_URI } from "./config.service.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);

    process.exit(1);
  }
};