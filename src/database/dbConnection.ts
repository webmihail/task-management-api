import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";
const config = require("./config.js")[env];
const sequelize = new Sequelize(config);

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

export default sequelize;
