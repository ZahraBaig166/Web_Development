const express = require("express");
const router = express.Router();
const Product = require("../models/Products");


router.get("/products/new", async (req, res) => {
  res.render("products/new");
});

router.post("/products/new", async (req, res) => {
  let record = new Product(req.body);
  await record.save();
  return res.redirect("/products");
});

router.get("/products/:id/delete", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  return res.redirect("/products");
});

router.get("/products/:id/edit", async (req, res) => {
  let product = await Product.findById(req.params.id);
  return res.render("products/edit", { product });
});

router.post("/products/:id/edit", async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.category = req.body.category;
  product.price = req.body.price;
  product.description = req.body.description;
  await product.save();
  return res.redirect("/products");
});

router.get("/products/:page?", async (req, res) => {
  let page = Number(req.params.page) ? Number(req.params.page) : 1;
  let pageSize = 3;
  let products = await Product.find()
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  let total = await Product.countDocuments();
  let totalPages = Math.ceil(total / pageSize);
  res.render("products/list", {
    pageTitle: "List All Products",
    products,
    total,
    page,
    pageSize,
    totalPages,
  });
});

module.exports = router;
