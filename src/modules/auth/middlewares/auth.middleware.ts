import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "@errors/errors";
import { User } from "@database/models/user";
import { ITokenData } from "../interfaces/token-data.interface";

require("dotenv").config();

const handleAuthValidation = (checkedData?: string) => {
  if (!checkedData) throw HttpError.unauthorized();
};

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    handleAuthValidation(token);

    const decoded = jwt.verify(token!, process.env.JWT_SECRET!);
    const { id } = decoded as ITokenData;
    const user = await User.findOne({ where: { id } });
    handleAuthValidation(user!.id);

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
