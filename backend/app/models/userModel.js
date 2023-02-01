const mongoose = require("mongoose");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/** Hooks */
userSchema.methods.matchPassword = async function (password) {
  return await comparePassword(this.password, password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await hashPassword(this.password);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
