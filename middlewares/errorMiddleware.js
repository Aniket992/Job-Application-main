const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  // Default error object
  const defaultError = {
    statusCode: 500,
    message: " ",
  };

  // Handle specific error cases
  if (err.message === "Email already registered. Please login") {
    defaultError.statusCode = 500;
    defaultError.message = "Email already registered. Please login";
  } 
  if (err.message === "Please Provide  Fields") {
    defaultError.statusCode = 400;
    defaultError.message = "Email and password are required fields";
  } 
  else if (err.message === "Invalid email or password") {
    defaultError.statusCode = 500;
    defaultError.message = "Invalid Email or password";
  } 
  else if (err.message === "Password is required and should be at least 6 characters long") {
    defaultError.statusCode = 500;
    defaultError.message = "Password is required and should be at least 6 characters long";
  }
  else if (err.code && err.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.message = `${Object.keys(err.keyValue)} field has to be unique`;
  }

  // Send response with error details
  res.status(defaultError.statusCode).json({ message: defaultError.message });
};

export default errorMiddleware;
