const router = require("express").Router();
const { registerCustomer, loginCustomer } = require("../controllers/customer");

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);

module.exports = router;
