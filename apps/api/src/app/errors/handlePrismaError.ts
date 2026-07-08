const handlePrismaError = (error: any) => {
  let message = "Database Error";

  if (error.code === "P2002") {
    message = "Duplicate value found";
  }

  if (error.code === "P2025") {
    message = "Record not found";
  }

  return {
    statusCode: 400,
    message,
    errorMessages: [
      {
        path: "",
        message,
      },
    ],
  };
};

export default handlePrismaError;