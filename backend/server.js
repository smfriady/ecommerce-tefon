const PORT = 3001 || process.env.PORT;

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
main().catch((err) => console.log(err));

async function main() {
  mongoose.set("strictQuery", true);
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log(`Database terhubung at ${mongoose.connection.host}`);
}

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, (_) => console.log(`serverup at port ${PORT}`));
