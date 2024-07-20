export default class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

//To handle the input errors in form
export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is Invalid. Try Again!`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired. Try Again!`;
    err = new ErrorHandler(message, 400);
  }

  //Occurs when there's a mismatch of type while entering data
  if (err.name === "CastError") {
    const message = `JInvalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Extracts the error messages from the Error object.
  const errorMessage = err.errors // Check if err object has an errors property
    ? Object.values(err.errors) // If it does, extract the values (error objects)
        .map((error) => error.message) // Map over each error object and extract the 'message' property
        .join(" ") // Join all the error messages into a single string separated by spaces
    : err.message; // If there are no nested errors, use the main error message

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};
