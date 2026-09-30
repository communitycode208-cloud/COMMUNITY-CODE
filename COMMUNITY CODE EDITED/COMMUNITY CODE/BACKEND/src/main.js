import app from "./app.bootstrap.js";
import { connectDB } from "./config/db.connection.js";
import { PORT } from "./config/config.service.js";

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();