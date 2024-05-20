const express = require("express");
const multer = require("multer");
const Product = require("../models/Products");
const router = express.Router();


const upload = multer();

router.get("/products/new", async (req, res) => {
  console.log("Accessing the new product form");
  res.render("new", {pageContent: "new"});
});


router.post("/products/new", upload.single('image'), async (req, res) => {
  try {
    const { name, category, type, price, description } = req.body;
    const image = req.file ? req.file.buffer : null;
    const newProduct = new Product({ name, category, type, price, description, image });
    await newProduct.save();
    return res.redirect("/list");
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating product.');
  }
});

router.get("/products/:id/delete", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.redirect("/list");
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting product.');
  }
});


router.get("/products/:id/edit", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("layout", { 
      pageContent: "edit", // This points to the 'edit.ejs' file under the 'views' directory.
      product: product // Make sure to pass the product to the 'edit.ejs' file.
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading product.');
  }
});


router.post("/products/:id/edit", upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, type, price, description } = req.body;
    const image = req.file ? req.file.buffer : undefined;
    const updateData = { name, category, type, price, description };
    if (image !== undefined) {
      updateData.image = image;
    }
    await Product.findByIdAndUpdate(id, updateData);
    return res.redirect("/list");
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating product.');
  }
});

module.exports = router;
