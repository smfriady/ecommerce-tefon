const jwt = require("jsonwebtoken");

const jwtSign = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const jwtVerify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { jwtSign, jwtVerify };
