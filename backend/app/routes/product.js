const router = require("express").Router();
const {
  getProducts,
  getProductById,
  insertProduct,
  updateProduct,
} = require("../controllers/product");
const { authentication, admin } = require("../middlewares/authentication");

router.get("/", getProducts);
router.get("/:productId", getProductById);

router.use(authentication);
router.post("/", admin, insertProduct);
router.put("/:productId", admin, updateProduct);
module.exports = router;
