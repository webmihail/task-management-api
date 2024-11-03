interface Errors {
  property: string;
  constraints: string[] | undefined;
}

export class HttpError extends Error {
  public status: number;
  public errors?: Errors[];

  constructor(status: number, message: string, errors?: Errors[]) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.name = this.constructor.name;
  }

  static badRequest(message?: string, errors?: Errors[]): HttpError {
    return new HttpError(400, message || "Bad Request", errors);
  }

  static unauthorized(): HttpError {
    return new HttpError(401, "Unauthorized");
  }

  static notFoundError(): HttpError {
    return new HttpError(404, "Not Found");
  }

  static internalServerError(): HttpError {
    return new HttpError(500, "Internal Server Error");
  }
}
