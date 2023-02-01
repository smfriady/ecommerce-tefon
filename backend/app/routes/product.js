const router = require("express").Router();
const { getProducts, getProductById } = require("../controllers/product");

router.get("/", getProducts);
router.get("/:productId", getProductById);
module.exports = router;
