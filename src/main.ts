import express, { Application } from "express";
import cors from "cors";

import errorHandler from "@middlewares/error.middleware";
import requestLogger from "@middlewares/requestLogger.middleware";
import allRoutes from "@modules/routes";

require("dotenv").config();

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use("/api", allRoutes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
