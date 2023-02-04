const router = require("express").Router();
const { registerCustomer, loginCustomer, me } = require("../controllers/customer");
const { authentication } = require("../middlewares/authentication");

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);

router.use(authentication);
router.get("/me", me);

module.exports = router;
