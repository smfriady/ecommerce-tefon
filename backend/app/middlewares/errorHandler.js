const errorHandler = (err, req, res, next) => {
  let code;
  let message;

  if (err.name === "InvalidMongoId") {
    code = 400;
    message = "Invalid product id.";
  } else if (err.name === "UserExists") {
    code = 400;
    message = "User already exists.";
  } else if (err.name === "InvalidEmailOrPassword") {
    code = 401;
    message = "Invalid email or password.";
  } else if (err.name === "CheckInputRegister") {
    code = 400;
    message = "Please enter a value in the field.";
  } else if (err.name === "CheckInputCreateProduct") {
    code = 400;
    message = "Please enter a value in the field product.";
  } else if (err.name === "Unauthorized") {
    code = 401;
    message = "Unauthorized, no user login.";
  } else if (err.name === "ForbiddenAsAdmin") {
    code = 403;
    message = "Forbidden as an admin";
  } else if (err.name === "NoProductFound") {
    code = 404;
    message = "Product Not Found";
  } else {
    code = 500;
    message = "Internal server error.";
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
