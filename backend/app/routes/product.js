const router = require("express").Router();
const {
  getProducts,
  getProductById,
  insertProduct,
  updateProduct,
  destroyProduct,
} = require("../controllers/product");
const { authentication, admin } = require("../middlewares/authentication");

router.get("/", getProducts);
router.get("/:productId", getProductById);

router.use(authentication);
router.post("/", admin, insertProduct);
router.put("/:productId", admin, updateProduct);
router.delete("/:productId", admin, destroyProduct);
module.exports = router;
