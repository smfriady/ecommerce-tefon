const API_URI = "/api/v1";

const router = require("express").Router();
const productRouter = require("./product");
const customerRouter = require("./customer");

router.use(`${API_URI}/products`, productRouter);
router.use(`${API_URI}/customers`, customerRouter);

module.exports = router;
