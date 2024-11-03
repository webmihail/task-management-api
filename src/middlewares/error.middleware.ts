import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

import { httpLogger } from "@helpers/logger";
import { HttpError } from "@errors/errors";

const errorHandler: ErrorRequestHandler = (
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const internalServerError: HttpError = HttpError.internalServerError();
  const errorData = err instanceof HttpError ? err : internalServerError;
  const { status, message, errors } = errorData;

  httpLogger.error({
    message,
    status,
    errors,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  res.status(status).json({
    status,
    message,
    ...(errors ? { errors } : {}),
  });
};

export default errorHandler;
