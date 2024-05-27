const express = require("express");
const multer = require("multer");
const Product = require("../models/Products");
const router = express.Router();

// Configure multer to store images in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to access the new product form
router.get("/products/new", (req, res) => {
  res.render("new", { pageContent: "new" });
});

// Route to create a new product
router.post("/products/new", upload.single('image'), async (req, res) => {
  try {
    const { name, category, type, price, description } = req.body;
    const image = req.file ? req.file.buffer : null;
    const newProduct = new Product({ name, category, type, price, description, image });
    await newProduct.save();
    res.redirect("/list");
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send('Error creating product. Please try again.');
  }
});

// Route to delete a product
router.get("/products/:id/delete", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/list");
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send('Error deleting product. Please try again.');
  }
});

// Route to access the product edit form
router.get("/products/:id/edit", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("edit", { 
      product, 
      user: req.user, // Assuming user is available in req
      pageContent: 'edit' // Include pageContent variable
    });
  } catch (error) {
    console.error("Error loading product:", error);
    res.status(500).send('Error loading product. Please try again.');
  }
});

// Route to update a product
router.post("/products/:id/edit", upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, type, price, description } = req.body;
    console.log(name, category, type, price)
    const image = req.file ? req.file.buffer : undefined;
    const updateData = { name, category, type, price, description, ...(image && { image }) };
    await Product.findByIdAndUpdate(id, updateData);
    res.redirect("/list");
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send('Error updating product. Please try again.');
  }
});

module.exports = router;
