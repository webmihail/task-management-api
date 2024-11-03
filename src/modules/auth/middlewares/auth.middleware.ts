import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "@errors/errors";
import { ITokenData } from "../interfaces/token-data.interface";
import { ExtendedRequest } from "@modules/auth/interfaces/extended-reauest.interface";

const handleBadRequest = () => {
  throw HttpError.badRequest("Token invalid");
};

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) handleBadRequest();

    jwt.verify(token!, process.env.JWT_SECRET!, (err, verifiedUser) => {
      if (err) handleBadRequest();
      (req as ExtendedRequest).user = verifiedUser as ITokenData;

      next();
    });
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
