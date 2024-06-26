const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  category: { type: String, index: true }, 
  type: String,
  price: Number,
  description: String,
  image: Buffer
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

