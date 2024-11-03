import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "@errors/errors";
import { User } from "@database/models/user";
import { ITokenData } from "../interfaces/token-data.interface";

require("dotenv").config();

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw HttpError.unauthorized();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { id } = decoded as ITokenData;
    const user = await User.findOne({ where: { id } });
    if (!user) next(HttpError.unauthorized());

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
