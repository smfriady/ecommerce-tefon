const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
      default: 0,
    },
    brand: {
      type: String,
      required: false,
    },
    product_image_url: {
      type: String,
      required: true,
    },
    product_info: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
