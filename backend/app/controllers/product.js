const Product = require("../models/productModel");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
async function getAll(req, res, next) {
  try {
    const product = await Product.find().limit(10);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}
module.exports = { getAll };
