const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const comparePassword = async (password, enteredPassword) => {
  return bcrypt.compare(enteredPassword, password);
};

module.exports = { hashPassword, comparePassword };
