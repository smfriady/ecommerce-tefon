const mongoose = require("mongoose");

async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGODB_URI_DEV, { useNewUrlParser: true });
  console.log(`Database terhubung at ${mongoose.connection.host}`);
}

module.exports = main;
