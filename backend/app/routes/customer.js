const router = require("express").Router();
const { registerCustomer } = require("../controllers/customer");

router.post("/register", registerCustomer);

module.exports = router;
