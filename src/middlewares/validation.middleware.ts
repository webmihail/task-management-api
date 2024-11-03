import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import { HttpError } from "@errors/errors";
import { ClassConstructor } from "class-transformer/types/interfaces";

const validation = (dtoClass: ClassConstructor<object>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);

    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      const validationErrors = errors.map((err) => ({
        property: err.property,
        constraints: err.constraints
          ? Object.values(err.constraints)
          : undefined,
      }));

      return next(HttpError.badRequest("Validation Error", validationErrors));
    }

    next();
  };
};

export default validation;
