const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const Product = require("../models/productModel");
const main = require("../../configs/db");

main().catch((err) => {
  console.log(err);
  process.exit(1);
});

let data = [];

fs.createReadStream(path.resolve("./", "data", "ibox-product.csv"))
  .pipe(csv.parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => {
    delete row.real_pdp_url;
    data.push(row);
  })
  .on("end", () =>
    data.map(async (p, i) => {
      let product = new Product({
        id: p.id,
        product_name: p.product_name,
        product_price: Number(p.product_price),
        brand: p.brand,
        product_image_url: p.product_image_url,
        product_info: p.product_info,
      });
      await product.save((err, result) => {
        if (i === data.length - 1) {
          console.log("DONE!");
          process.exit(1);
        }
      });
    })
  );
