const User = require("../models/userModel");

// @desc    Create user
// @route   POST /api/v1/customer/register
// @access  Public
async function registerCustomer(req, res, next) {
  try {
    const { name, password, email } = req.body;

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

module.exports = { registerCustomer };
