const Product = require("../models/productModel");
const { isValid } = require("mongoose").Types.ObjectId;

// @desc    Fetch all products
// @route   GET /api/v1/products
// @access  Public
async function getProducts(req, res, next) {
  try {
    const products = await Product.find().limit(10);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

// @desc    Fetch single product
// @route   GET /api/v1/products/:productId
// @access  Public
async function getProductById(req, res, next) {
  try {
    const id = req.params.productId;

    const isId = isValid(id);
    if (!isId) throw { name: "InvalidMongoId" };

    const product = await Product.findById(id).select("-createdAt -updatedAt -__v");

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = { getProducts, getProductById };
