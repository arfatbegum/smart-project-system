import { StatusCodes } from "http-status-codes";

class AppError extends Error {
  public readonly statusCode: number;

  constructor(
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message: string
  ) {
    super(message);

    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;