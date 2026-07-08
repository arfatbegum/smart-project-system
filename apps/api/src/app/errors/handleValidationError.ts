const handleValidationError = (error: any) => {
  const errors = Object.values(error.errors).map((err: any) => ({
    path: err.path,
    message: err.message,
  }));

  return {
    statusCode: 400,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleValidationError;