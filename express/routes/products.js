const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const Product = require("../models/Products");

router.get("/new", async (req, res) => {
  res.render("new",{pageContent:"new"});
});

router.post("/products/new", async (req, res) => {
  let record = new Product(req.body);
  await record.save();
  return res.redirect("/list");
});

router.get("/:id/delete", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  return res.redirect("/list");  
});


router.get("/:id/edit", async (req, res) => {
  let product = await Product.findById(req.params.id);
  res.render("edit", { pageContent:"edit",product });  
});

router.post("/:id/edit", async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.category = req.body.category;
  product.price = req.body.price;
  product.description = req.body.description;
  await product.save();
  return res.redirect("/list");  
});

module.exports = router;