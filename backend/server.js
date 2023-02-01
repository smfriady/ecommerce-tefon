const PORT = 3001 || process.env.PORT;

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const main = require("./configs/db");

main().catch((err) => {
  console.log(err);
  process.exit(1);
});

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, (_) => console.log(`serverup at port ${PORT}`));
