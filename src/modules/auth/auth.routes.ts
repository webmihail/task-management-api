import express from "express";

import validation from "@middlewares/validation.middleware";
import { AuthController } from "./auth.controller";
import { LoginDTO } from "./dtos/login.dto";
import { RegisterDTO } from "./dtos/register.dto";

const router = express.Router();
const authController = new AuthController();

router.post(
  "/login",
  validation(LoginDTO),
  authController.login.bind(authController),
);

router.post(
  "/register",
  validation(RegisterDTO),
  authController.register.bind(authController),
);

export default router;
