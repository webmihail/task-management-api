import { Request, Response, NextFunction } from "express";

import { httpLogger } from "@helpers/logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  httpLogger.info({
    message: "Request received",
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  next();
};

export default requestLogger;
