const API_URI = "/api/v1";

const router = require("express").Router();
const productRouter = require("./product");

router.use(`${API_URI}/products`, productRouter);

module.exports = router;
