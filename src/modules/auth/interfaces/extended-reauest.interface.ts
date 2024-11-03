import { Request } from "express";
import { ITokenData } from "@modules/auth/interfaces/token-data.interface";

export interface ExtendedRequest extends Request {
  user: ITokenData;
}
