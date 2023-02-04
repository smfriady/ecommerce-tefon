const jwt = require("jsonwebtoken");
const { jwtSign } = require("../helpers/jwt");
const User = require("../models/userModel");

// @desc    Create user
// @route   POST /api/v1/customer/register
// @access  Public
async function registerCustomer(req, res, next) {
  try {
    const { name, password, email } = req.body;
    if (!name || !password || !email) throw { name: "CheckInputRegister" };

    const userExists = await User.findOne({ email });
    if (userExists) throw { name: "UserExists" };

    const data = { name: name.toLowerCase(), email: email.toLowerCase(), password };

    const user = new User(data);

    await user.save();

    res.status(201).json({ id: user._id, message: "register successfully." });
  } catch (error) {
    next(error);
  }
}

// @desc    Create user
// @route   POST /api/v1/customer/login
// @access  Public
async function loginCustomer(req, res, next) {
  try {
    const { password, email } = req.body;
    if (!password || !email) throw { name: "CheckInputRegister" };

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        token: jwtSign(user._id),
        message: "Sign in successfully.",
      });
    } else {
      throw { name: "InvalidEmailOrPassword" };
    }
  } catch (error) {
    next(error);
  }
}

// @desc    GET customer
// @route   POST /api/v1/customer/me
// @access  Private
async function me(req, res, next) {
  try {
    const { id } = req.user;

    const user = await User.findById(id).select("-createdAt -updatedAt -__v -password");

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = { registerCustomer, loginCustomer, me };
