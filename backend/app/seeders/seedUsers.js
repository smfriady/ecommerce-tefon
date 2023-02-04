require("dotenv").config();
const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const User = require("../models/userModel");
const main = require("../../configs/db");

main().catch((err) => {
  console.log(err);
  process.exit(1);
});

let dataSeed = [
  {
    name: "admin1",
    password: "12345",
    email: "admin1@gmail.com",
    isAdmin: true,
  },
  {
    name: "customer",
    password: "12345",
    email: "customer@gmail.com",
    isAdmin: false,
  },
];

function seedUsers(users) {
  users.map(async (u, i) => {
    let user = new User({
      name: u.name,
      password: u.password,
      email: u.email,
      isAdmin: u.isAdmin,
    });

    await user.save((err, result) => {
      if (i === dataSeed.length - 1) {
        console.log("DONE!");
        process.exit(1);
      }
    });
  });
}

seedUsers(dataSeed);
