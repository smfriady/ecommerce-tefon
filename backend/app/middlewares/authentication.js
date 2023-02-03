const User = require("../models/userModel");
const { jwtVerify } = require("../helpers/jwt");

async function authentication(req, _res, next) {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) throw { name: "Unauthorized" };

    const decoded = jwtVerify(token, process.env.JWT_SECRET);

    const { id } = decoded;
    const user = await User.findById(id);
    if (user) {
      req.user = { id: user._id, isAdmin: user.isAdmin };
      next();
    } else {
      throw { name: "Unauthorized" };
    }
  } catch (err) {
    next(err);
  }
}

const admin = (req, _res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    throw { name: "ForbiddenAsAdmin" };
  }
};

module.exports = { authentication, admin };
