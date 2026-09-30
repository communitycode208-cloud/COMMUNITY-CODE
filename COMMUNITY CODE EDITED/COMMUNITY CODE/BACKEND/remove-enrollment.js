import mongoose from "mongoose";
import { MONGO_URI } from "./src/config/config.service.js";
import { Enrollment } from "./src/DB/models/enrollment.model.js";

const removeEnrollment = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const result = await Enrollment.deleteOne({
      userId: "6aa22270fa07244e4eaf6f29",
      courseId: "6aa2263a19e9d9e5c6cd5427"
    });

    if (result.deletedCount === 0) {
      console.log("Enrollment not found");
    } else {
      console.log("Enrollment deleted successfully");
    }
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

removeEnrollment();