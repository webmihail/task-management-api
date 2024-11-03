import express, { Application } from "express";

import errorHandler from "@middlewares/error.middleware";
import requestLogger from "@middlewares/requestLogger.middleware";
import taskRoutes from "@modules/tasks/tasks.routes";
import authRoutes from "@modules/auth/auth.routes";

require("dotenv").config();

const app: Application = express();
app.use(express.json());
app.use(requestLogger);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
