import mongoose from "mongoose";
import { MONGO_URI } from "./src/config/config.service.js";
import { User } from "./src/DB/models/user.model.js";

const makeAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const user = await User.findOneAndUpdate(
      { email: "omar@example.com" },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      console.log("User not found");
    } else {
      console.log("User is now admin:", user.email);
      console.log("Role:", user.role);
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    await mongoose.disconnect();
  }
};

makeAdmin();