const router = require("express").Router();
const { getAll } = require("../controllers/product");

router.get("/", getAll);

module.exports = router;
