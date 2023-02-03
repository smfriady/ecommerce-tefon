const Product = require("../models/productModel");
const { isValid } = require("mongoose").Types.ObjectId;

// @desc    Fetch all products
// @route   GET /api/v1/products
// @access  Public
async function getProducts(req, res, next) {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(10);
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
    next(error);
  }
}

// @desc    Create product
// @route   POST /api/v1/products
// @access  Private
async function insertProduct(req, res, next) {
  try {
    const { product_name, product_price, brand, product_image_url, product_info } = req.body;

    if (!product_name || !product_price || !brand || !product_image_url || !product_info)
      throw { name: "CheckInputCreateProduct" };

    const data = { product_name, product_price, brand, product_image_url, product_info };

    const product = new Product(data);

    await product.save();

    res.status(201).json({ message: `Product ${product_name}, created successfully.` });
  } catch (error) {
    next(error);
  }
}

// @desc    Update product
// @route   PUT /api/v1/products/:productId
// @access  Private
async function updateProduct(req, res, next) {
  try {
    const id = req.params.productId;
    const { product_name, product_price, brand, product_image_url, product_info } = req.body;

    if (!product_name || !product_price || !brand || !product_image_url || !product_info)
      throw { name: "CheckInputCreateProduct" };

    const isId = isValid(id);
    if (!isId) throw { name: "InvalidMongoId" };

    const product = await Product.findById(id).select("-createdAt -updatedAt -__v");
    if (!product) throw { name: "NoProductFound" };

    product.product_name = product_name;
    product.product_price = product_price;
    product.brand = brand;
    product.product_image_url = product_image_url;
    product.product_info = product_info;

    const updatedProduct = await product.save();

    res.status(200).json({ message: `Product ${updatedProduct.product_name}, updated successfully.` });
  } catch (error) {
    next(error);
  }
}

module.exports = { getProducts, getProductById, insertProduct, updateProduct };
