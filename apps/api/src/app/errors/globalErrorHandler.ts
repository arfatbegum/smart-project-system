import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import AppError from "./AppError";
import handleCastError from "./handleCastError";
import handlePrismaError from "./handlePrismaError";
import handleValidationError from "./handleValidationError";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  let message = "Something went wrong";

  let errorMessages = [
    {
      path: "",
      message: error.message || "Unknown Error",
    },
  ];

  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === "CastError") {
    const simplifiedError = handleCastError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.code?.startsWith("P")) {
    const simplifiedError = handlePrismaError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;

    message = error.message;

    errorMessages = [
      {
        path: "",
        message: error.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack:
      process.env.NODE_ENV === "development"
        ? error.stack
        : undefined,
  });
};

export default globalErrorHandler;